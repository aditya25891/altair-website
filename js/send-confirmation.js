// netlify/functions/send-confirmation.js
//
// Sends a styled confirmation email (via Resend) and, once configured, a
// WhatsApp confirmation message (via Meta's WhatsApp Cloud API) to whoever
// submitted the Altair enquiry form. Runs as a Netlify Function — deploy
// the whole project folder (including this netlify/functions directory).
//
// EMAIL setup required before that part works:
//   1. Create a free Resend account at https://resend.com
//   2. Verify altairjewels.in as a sending domain
//   3. Generate an API key in Resend
//   4. In Netlify: Site configuration → Environment variables →
//      add Resend_API_Key with that key as the value
//
// WHATSAPP setup required before that part works:
//   1. Create/verify a Meta Business Manager account
//   2. Create a Meta App → add the WhatsApp product
//   3. Get a Phone Number ID (test number is fine to start)
//   4. Generate a permanent access token (System User, not the 24hr default)
//   5. Create + get approval for a message template named
//      "enquiry_confirmation" (Utility category) with two variables:
//      {{1}} = first name, {{2}} = interest
//   6. In Netlify: Site configuration → Environment variables → add:
//      WHATSAPP_ACCESS_TOKEN  (the permanent token from step 4)
//      WHATSAPP_PHONE_NUMBER_ID  (from step 3)
//
// The WhatsApp step is entirely optional — if those two variables aren't
// set yet, this function simply skips WhatsApp and still sends the email
// as before. Nothing breaks while you're getting Meta's approval sorted.

const RESEND_API_KEY = process.env.Resend_API_Key;
const FROM_EMAIL = 'Aditya at Altair <aditya@altairjewels.in>';

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_TEMPLATE_NAME = 'enquiry_confirmation';

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
  const phone = (data['phone'] || '').trim();

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
    message: escapeHtml(message).replace(/\r?\n/g, '<br>'),
  });

  let emailSent = false;
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
        reply_to: 'aditya@altairjewels.in',
        subject: 'Your Enquiry, ' + firstName + ' — Altair',
        html: html,
        text: buildEmailText({ firstName, interest, message }),
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend API error (' + response.status + ') sending to ' + toEmail + ':', errText);
    } else {
      emailSent = true;
      console.log('Resend accepted email for', toEmail, await response.text());
    }
  } catch (err) {
    console.error('Unexpected error sending email:', err);
  }

  // WhatsApp is optional — only attempt it if configured, and never let a
  // WhatsApp failure affect the response the browser sees for the email.
  let whatsappSent = false;
  let whatsappSkippedReason = null;

  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    whatsappSkippedReason = 'WhatsApp not configured yet (missing env vars).';
  } else if (!phone) {
    whatsappSkippedReason = 'No phone number submitted on the form.';
  } else {
    try {
      const waResponse = await fetch(
        `https://graph.facebook.com/v23.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + WHATSAPP_ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: normalizePhone(phone),
            type: 'template',
            template: {
              name: WHATSAPP_TEMPLATE_NAME,
              language: { code: 'en' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: firstName },
                    { type: 'text', text: interest },
                  ],
                },
              ],
            },
          }),
        }
      );

      if (!waResponse.ok) {
        const errText = await waResponse.text();
        console.error('WhatsApp API error:', errText);
      } else {
        whatsappSent = true;
      }
    } catch (err) {
      console.error('Unexpected error sending WhatsApp message:', err);
    }
  }

  if (whatsappSkippedReason) {
    console.log('WhatsApp send skipped: ' + whatsappSkippedReason);
  }

  if (!emailSent) {
    return { statusCode: 502, body: 'Failed to send confirmation email.' };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ sent: true, emailSent, whatsappSent }),
  };
};

// Strips spaces/dashes/parens and ensures a leading country code so the
// number matches what WhatsApp's API expects (digits only, no "+").
function normalizePhone(raw) {
  let cleaned = raw.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (cleaned.length === 10) cleaned = '91' + cleaned; // default to India if no country code given
  return cleaned;
}

function buildEmailText({ firstName, interest, message }) {
  return [
    'Thank You, ' + firstName + '.',
    '',
    'Your inquiry has been received by the Altair Atelier. We believe fine jewellery begins with a conversation, and our team is already reviewing your vision.',
    '',
    'Aditya or a member of our founding team will reach out to you via your preferred contact method within 24 hours to begin.',
    '',
    'YOUR ENQUIRY',
    'Interested in: ' + interest,
    'Your notes: ' + message,
    '',
    'Message us on WhatsApp: https://wa.me/919819898483',
    '',
    'Altair Fine Jewellery — Arda Jewels LLP',
    'EE8090, Bharat Diamond Bourse, BKC, Mumbai 400051',
    'aditya@altairjewels.in · +91 98198 98483',
  ].join('\n');
}

function buildEmailHtml({ firstName, interest, message }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="only light" />
<meta name="supported-color-schemes" content="light" />
<title>Your Enquiry — Altair</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f2;font-family:Georgia,'Times New Roman',serif;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your enquiry has been received by the Altair Atelier. We'll be in touch within 24 hours.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#f4f4f2" style="background-color:#f4f4f2;padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="#021b40" style="background-color:#021b40;max-width:600px;width:100%;">

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

              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.75;color:#c3c9d3;margin:0 0 20px;">
                Your inquiry has been received by the Altair Atelier. We believe fine jewellery begins with a conversation, and our team is already reviewing your vision.
              </p>

              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.75;color:#c3c9d3;margin:0 0 32px;">
                Aditya or a member of our founding team will reach out to you via your preferred contact method within 24 hours to begin.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a456e;margin-bottom:36px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a8c0e8;margin:0 0 16px;">
                      Your Enquiry
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b95a6;width:110px;vertical-align:top;">Interested in</td>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#d9dde3;">${interest}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#8b95a6;vertical-align:top;">Your notes</td>
                        <td style="padding:6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;color:#d9dde3;">${message}</td>
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
              <div style="height:1px;background-color:#26405f;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 48px 48px;">
              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:#7e889a;margin:0 0 4px;">
                Altair Fine Jewellery — Arda Jewels LLP
              </p>
              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:#7e889a;margin:0 0 4px;">
                EE8090, Bharat Diamond Bourse, BKC, Mumbai 400051
              </p>
              <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.7;color:#7e889a;margin:0;">
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
