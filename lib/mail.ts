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
  const bestellingLink = maakBestellingLink(
    vestiging,
    medewerker,
    datum,
    regels,
    opmerking,
  );

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
body{margin:0;padding:32px 16px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#263238}
.container{max-width:640px;margin:0 auto;background:#fff;border:1px solid #e2e6e9;border-radius:12px;overflow:hidden}
.header{padding:28px 32px;border-bottom:1px solid #e8ecef}
.logo{font-size:25px;font-weight:700;color:#159447;margin:0 0 6px}
.header p{margin:0;color:#68737d;font-size:15px}
.content{padding:30px 32px}
h1{font-size:24px;margin:0 0 18px;color:#263238}
p{font-size:16px;line-height:1.6;margin:0 0 16px}
.info{margin:24px 0;padding:18px 20px;background:#f7f8f9;border-radius:8px}
.info-row{padding:5px 0;font-size:15px}.label{font-weight:700;display:inline-block;min-width:100px}
.action{text-align:center;margin:30px 0 24px}
.button{display:inline-block;background:#159447;color:#fff!important;text-decoration:none;padding:14px 24px;border-radius:8px;font-weight:700;font-size:16px}
.small{font-size:14px;color:#68737d}
.footer{padding:18px 32px;background:#fafbfb;border-top:1px solid #e8ecef;color:#7b858d;font-size:12px;line-height:1.5}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <p class="logo">Clevers Bestellen</p>
    <p>Nieuwe bestelling ontvangen</p>
  </div>
  <div class="content">
    <h1>Bestelling voor ${vestiging}</h1>
    <p>De telling voor <strong>${vestiging}</strong> is afgerond en de bestelling is gereed.</p>
    <div class="info">
      <div class="info-row"><span class="label">Vestiging:</span> ${vestiging}</div>
      <div class="info-row"><span class="label">Datum:</span> ${datum}</div>
      <div class="info-row"><span class="label">Medewerker:</span> ${medewerker}</div>
    </div>
    <p>In de bijlage vind je de bestelling voor <strong>${vestiging}</strong>.</p>
    <p>Om de bestelling direct verder te verwerken, klik je op onderstaande knop. De bestelling wordt dan geopend met de getelde aantallen al ingevuld.</p>
    <div class="action">
      <a class="button" href="${bestellingLink}">Open bestelling en ga verder →</a>
    </div>
    <p class="small">Controleer de bestelling en open daarna de Clevers-bestelpagina om deze verder te verwerken.</p>
  </div>
  <div class="footer">Deze e-mail is automatisch verzonden vanuit Clevers Bestellen.<br />De volledige bestelling vind je als PDF in de bijlage.</div>
</div>
</body>
</html>`;
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
    subject: `Nieuwe bestelling - ${vestiging}`,
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
