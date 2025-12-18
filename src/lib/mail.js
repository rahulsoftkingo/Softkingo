// import nodemailer from 'nodemailer';

// export async function sendWelcomeEmail(email, fullname, temporaryPassword) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       secure: process.env.EMAIL_SECURE === 'true',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//       }
//     });

//     await transporter.sendMail({
//       from: `"Softkingo" <${process.env.EMAIL_FROM}>`,
//       to: email,
//       subject: 'Welcome to Softkingo',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #4f46e5;">Welcome, ${fullname}!</h2>
//           <p>Your employee account has been successfully created.</p>
//           <p>Here are your login credentials:</p>
//           <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
//             <p><strong>Username:</strong> ${email}</p>
//             <p><strong>Temporary Password:</strong> ${temporaryPassword}</p>
//           </div>
//           <p>Please log in to the employee portal and change your password immediately:</p>
//           <p style="text-align: center; margin: 24px 0;">
//             <a href="${process.env.BASE_URL}/login" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
//               Login to Portal
//             </a>
//           </p>
//           <p><strong>Note:</strong> For security reasons, please do not share this email with anyone.</p>
//           <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
//           <p style="color: #6b7280; font-size: 14px;">
//             If you didn't request this, please contact HR immediately.
//           </p>
//         </div>
//       `
//     });

//     return true;
//   } catch (error) {
//     console.error('Error sending welcome email:', error);
//     return false;
//   }
// }






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
