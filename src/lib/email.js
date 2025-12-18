import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

export async function sendEmail({ to, subject, html, text }) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Softkingo" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    text,
    html,
  });
}
