

import { Resend } from "resend";
import { maakBestelPdf } from "./serverPdf";

let resend: Resend;

interface MailRegel {
  productNaam: string;
  geteld: number;
  buffer: number;
  besteld: number;
}

export async function verstuurBestelMail(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: MailRegel[]
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY ontbreekt.");
  }

  resend = new Resend(process.env.RESEND_API_KEY);



  // PDF genereren (nog niet meesturen)
  const pdf = await maakBestelPdf(
    vestiging,
    medewerker,
    datum,
    regels
  );


  const html = `
  <!DOCTYPE html>
  <html lang="nl">
    <head>
      <meta charset="UTF-8" />
      <style>
        body{
          margin:0;
          padding:24px;
          background:#f4f4f4;
          font-family:Arial,Helvetica,sans-serif;
          color:#333;
        }

        .container{
          max-width:700px;
          margin:0 auto;
          background:#fff;
          border-radius:10px;
          overflow:hidden;
          border:1px solid #e5e5e5;
        }

        .header{
          background:#009640;
          color:#fff;
          padding:24px;
        }

        .content{
          padding:24px;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:20px;
        }

        th{
          background:#009640;
          color:white;
          padding:10px;
        }

        td{
          padding:8px;
          border-bottom:1px solid #ddd;
        }

        .footer{
          padding:18px;
          text-align:center;
          font-size:13px;
          color:#777;
          background:#fafafa;
        }
      </style>
    </head>

    <body>

      <div class="container">

        <div class="header">
          <h1>🍦 Clevers Bestelapp</h1>
          <p>Nieuwe bestelling ontvangen</p>
        </div>

        <div class="content">

          <table>
            <tr>
              <td><strong>Vestiging</strong></td>
              <td>${vestiging}</td>
            </tr>

            <tr>
              <td><strong>Datum</strong></td>
              <td>${datum}</td>
            </tr>

            <tr>
              <td><strong>Medewerker</strong></td>
              <td>${medewerker}</td>
            </tr>
          </table>

          <h2>Bestelling</h2>

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Geteld</th>
                <th>Buffer</th>
                <th>Bestellen</th>
              </tr>
            </thead>

            <tbody>

              ${regels
                .map(
                  (regel) => `
                  <tr>
                    <td>${regel.productNaam}</td>
                    <td align="center">${regel.geteld}</td>
                    <td align="center">${regel.buffer}</td>
                    <td align="center"><strong>${regel.besteld}</strong></td>
                  </tr>
                `
                )
                .join("")}

            </tbody>

          </table>

          <p style="margin-top:20px;font-weight:bold;">
            Totaal te bestellen:
            ${regels.reduce((t, r) => t + r.besteld, 0)} bakken
          </p>

        </div>

        <div class="footer">
          Deze e-mail is automatisch verzonden vanuit de Clevers Bestelapp.
        </div>

      </div>

    </body>

  </html>
  `;

const { data, error } = await resend.emails.send({
  from: "Bestelapp <onboarding@resend.dev>",
  replyTo: "bram.derks@outlook.com",
  to: ["bram.derks@outlook.com"],
  subject: `🍦 Nieuwe bestelling - ${vestiging}`,
  html,

  attachments: [
    {
      filename: `Bestelling_${vestiging}_${datum.replace(/\//g, "-")}.pdf`,
      content: Buffer.from(pdf).toString("base64"),
    },
  ],
});


  if (error) {
    throw new Error(JSON.stringify(error));
  }


  return data;
}