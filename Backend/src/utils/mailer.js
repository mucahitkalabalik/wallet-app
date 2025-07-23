import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendVerificationEmail(to, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "E-posta Doğrulama Kodu",
    text: `Doğrulama kodunuz: ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Mail gönderim hatası:", err);
    throw err;
  }
}