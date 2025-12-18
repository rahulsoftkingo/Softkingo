// src/lib/whatsapp.js

const WHATSAPP_BASE_URL = 'https://graph.facebook.com/v20.0';

// Mock-friendly sender: if env missing, just log and return
export async function sendWhatsAppText({ to, text }) {
  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.log('[MOCK WHATSAPP] To:', to, 'Text:', text);
    return { mocked: true };
  }

  const url = `${WHATSAPP_BASE_URL}/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: text },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('WhatsApp API error:', errText);
    throw new Error('WhatsApp API error');
  }

  return res.json();
}

export function renderTemplateBody(templateBody, vars = {}) {
  let result = templateBody;
  Object.keys(vars).forEach((key) => {
    const pattern = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(pattern, vars[key]);
  });
  return result;
}
