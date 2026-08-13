// netlify/functions/send-confirmation.js
//
// Sends a styled confirmation email to whoever submitted the Altair enquiry
// form, using Resend (https://resend.com). Runs as a Netlify Function —
// deploy the whole project folder (including this netlify/functions
// directory) via your normal Netlify Drop / drag-and-drop deploy.
//
// Setup required before this works:
//   1. Create a free Resend account at https://resend.com
//   2. Verify altairjewels.in as a sending domain (Resend will give you
//      DNS records to add — TXT/CNAME/MX depending on their current setup)
//   3. Generate an API key in Resend
//   4. In Netlify: Site configuration → Environment variables →
//      add RESEND_API_KEY with that key as the value (never put the key
//      directly in this file or in any file you upload/share)

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'Aditya at Altair <aditya@altairjewels.in>';

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables.');
    return { statusCode: 500, body: 'Email service not configured.' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: 'Invalid request body.' };
  }

  const fullName = (data['full-name'] || '').trim();
  const firstName = fullName.split(' ')[0] || 'there';
  const toEmail = (data['email'] || '').trim();
  const interest = (data['interest'] || 'Not specified').trim();
  const message = (data['message'] || '—').trim();

  if (!toEmail) {
    return { statusCode: 400, body: 'Missing recipient email.' };
  }

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const html = buildEmailHtml({
    firstName: escapeHtml(firstName),
    interest: escapeHtml(interest),
    message: escapeHtml(message),
  });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [toEmail],
        subject: 'Your Enquiry, ' + firstName + ' — Altair',
        html: html,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend API error:', errText);
      return { statusCode: 502, body: 'Failed to send confirmation email.' };
    }

    return { statusCode: 200, body: JSON.stringify({ sent: true }) };
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    return { statusCode: 500, body: 'Unexpected error sending email.' };
  }
};

function buildEmailHtml({ firstName, interest, message }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your Enquiry — Altair</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f2;font-family:Georgia,'Times New Roman',serif;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your enquiry has been received by the Altair Atelier. We'll be in touch within 24 hours.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f2;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#021b40;max-width:600px;width:100%;">

          <tr>
            <td align="center" style="padding:48px 40px 32px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;letter-spacing:6px;color:#e9e9e9;">
                ALTAIR
              </div>
              <div style="width:60px;height:1px;background-color:#626363;margin:20px auto 0;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 48px 40px;">
              <p style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#f7fcfc;margin:0 0 24px;line-height:1.3;">
                Thank You, ${firstName}.
              </p>

              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.75;color:rgba(255,252,252,0.75);margin:0 0 20px;">
                Your inquiry has been received by the Altair Atelier. We believe fine jewellery begins with a conversation, and our team is already reviewing your vision.
              </p>

              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.75;color:rgba(255,252,252,0.75);margin:0 0 32px;">
                Aditya or a member of our founding team will reach out to you via your preferred contact method within 24 hours to begin.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(168,192,232,0.25);margin-bottom:36px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8c0e8;margin:0 0 16px;">
                      Your Enquiry
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(255,252,252,0.5);width:110px;vertical-align:top;">Interested in</td>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(255,252,252,0.85);">${interest}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(255,252,252,0.5);vertical-align:top;">Your notes</td>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:rgba(255,252,252,0.85);">${message}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f7d263;">
                    <a href="https://wa.me/919819898483" style="display:inline-block;padding:14px 28px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#021b40;text-decoration:none;">
                      Message Us on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <tr>
            <td style="padding:0 48px;">
              <div style="height:1px;background-color:rgba(98,99,99,0.3);"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 48px 48px;">
              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:rgba(255,252,252,0.45);margin:0 0 4px;">
                Altair Fine Jewellery — Arda Jewels LLP
              </p>
              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:rgba(255,252,252,0.45);margin:0 0 4px;">
                EE8090, Bharat Diamond Bourse, BKC, Mumbai 400051
              </p>
              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:rgba(255,252,252,0.45);margin:0;">
                aditya@altairjewels.in &nbsp;·&nbsp; +91 98198 98483
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
