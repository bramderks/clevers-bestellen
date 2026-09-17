import { Resend } from "resend";

import { maakBestelPdf } from "./serverPdf";

let resend: Resend | null = null;

interface MailRegel {
  productId: string;
  productNaam: string;
  geteld: number;
  buffer: number;
  besteld: number;
  bestelGroep: string;
}

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY ontbreekt.");
  }

  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

function getAppUrl() {
  // Never use VERCEL_URL for links in production e-mails: that can point to a
  // deployment-specific/preview hostname which is not the public app URL.
  return process.env.NEXT_PUBLIC_APP_URL || "https://clevers-bestellen.vercel.app";
}

function maakBestellingLink(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: MailRegel[],
  opmerking: string,
) {
  const payload = Buffer.from(
    JSON.stringify({ vestiging, medewerker, datum, regels, opmerking }),
    "utf8",
  ).toString("base64url");

  return `${getAppUrl()}/bestelling?data=${payload}`;
}

function maakHtml(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: MailRegel[],
  opmerking: string,
) {
  const totaal = regels.reduce((t, r) => t + r.besteld, 0);
  const bestelRegels = regels.filter((r) => r.besteld > 0).length;
  const bestellingLink = maakBestellingLink(
    vestiging,
    medewerker,
    datum,
    regels,
    opmerking,
  );
  const rijen = regels
    .map(
      (r) => `
        <tr>
          <td>${r.productNaam}</td>
          <td align="center">${r.geteld}</td>
          <td align="center">${r.buffer}</td>
          <td align="center"><strong>${r.besteld}</strong></td>
        </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"/><style>
body{margin:0;padding:24px;background:#f4f4f4;font-family:Arial,sans-serif;color:#333}.container{max-width:700px;margin:auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden}.header{background:#009640;color:#fff;padding:24px}.content{padding:24px}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#009640;color:#fff;padding:10px}td{padding:8px;border-bottom:1px solid #e5e5e5}.samenvatting{margin-top:24px;background:#f7f7f7;padding:16px;border-radius:8px}.actie{margin:28px 0;text-align:center}.knop{display:inline-block;background:#009640;color:#fff!important;text-decoration:none;padding:14px 24px;border-radius:8px;font-weight:bold}.footer{background:#fafafa;padding:18px;text-align:center;font-size:13px;color:#777}
</style></head><body><div class="container"><div class="header"><h1>🍦 Clevers Telapp</h1><p>Nieuwe telling ontvangen</p></div><div class="content">
<table><tr><td><strong>Vestiging</strong></td><td>${vestiging}</td></tr><tr><td><strong>Datum</strong></td><td>${datum}</td></tr><tr><td><strong>Medewerker</strong></td><td>${medewerker}</td></tr></table>
<h2>Telling</h2><table><thead><tr><th>Product</th><th>Geteld</th><th>Buffer</th><th>Bestellen</th></tr></thead><tbody>${rijen}</tbody></table>
<div class="samenvatting"><p><strong>Totaal te bestellen:</strong> ${totaal}</p><p><strong>Aantal bestelregels:</strong> ${bestelRegels}</p></div>
<div class="actie"><a class="knop" href="${bestellingLink}">Open bestelling met aantallen</a></div>
<p style="font-size:13px;color:#666;text-align:center">De link opent de bestelling met alle getelde aantallen al ingevuld. Vanuit daar kan de Clevers-bestelpagina worden geopend.</p>
</div><div class="footer">Deze e-mail is automatisch verzonden vanuit de Clevers Telapp.</div></div></body></html>`;
}

export async function verstuurBestelMail(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: MailRegel[],
  opmerking = "",
) {
  const pdf = await maakBestelPdf(vestiging, medewerker, datum, regels, opmerking);
  const bestandsDatum = datum.replace(/\//g, "-");

  const { data, error } = await getResend().emails.send({
    from: "Bestelapp <onboarding@resend.dev>",
    replyTo: "bram.derks@outlook.com",
    to: ["bram.derks@outlook.com"],
    subject: `🍦 Nieuwe telling - ${vestiging}`,
    html: maakHtml(vestiging, medewerker, datum, regels, opmerking),
    attachments: [
      {
        filename: `Telling_${vestiging}_${bestandsDatum}.pdf`,
        content: Buffer.from(pdf).toString("base64"),
      },
    ],
  });

  if (error) {
    console.error("E-mail verzenden mislukt:", error);
    throw new Error("E-mail verzenden mislukt.");
  }

  return data;
}
