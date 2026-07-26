console.log("MAIL.TS IS GELADEN");

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function verstuurBestelMail(
  vestiging: string,
  medewerker: string,
  datum: string
) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY ontbreekt.");
  }

  const html = `
  <!DOCTYPE html>
  <html lang="nl">
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          margin: 0;
          padding: 24px;
          background: #f4f4f4;
          font-family: Arial, Helvetica, sans-serif;
          color: #333;
        }

        .container {
          max-width: 700px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e5e5e5;
        }

        .header {
          background: #009640;
          color: white;
          padding: 24px;
        }

        .header h1 {
          margin: 0;
          font-size: 26px;
        }

        .header p {
          margin: 8px 0 0;
          opacity: 0.9;
        }

        .content {
          padding: 24px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        td {
          padding: 10px;
          border-bottom: 1px solid #ececec;
        }

        td:first-child {
          font-weight: bold;
          width: 180px;
        }

        .melding {
          margin-top: 30px;
          padding: 16px;
          background: #fff8e5;
          border-left: 4px solid #f0b429;
          border-radius: 4px;
        }

        .footer {
          padding: 18px;
          text-align: center;
          font-size: 13px;
          color: #777;
          background: #fafafa;
          border-top: 1px solid #ececec;
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
              <td>Vestiging</td>
              <td>${vestiging}</td>
            </tr>

            <tr>
              <td>Datum</td>
              <td>${datum}</td>
            </tr>

            <tr>
              <td>Medewerker</td>
              <td>${medewerker}</td>
            </tr>
          </table>

          <div class="melding">
            <strong>Let op</strong><br><br>
            Bij punt 5 wordt hier automatisch de volledige bestellijst toegevoegd
            met de kolommen:
            <ul>
              <li>Product</li>
              <li>Geteld</li>
              <li>Buffer</li>
              <li>Te bestellen</li>
            </ul>
          </div>

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
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  console.log("📧 Mail succesvol verzonden:", data?.id);

  return data;
}