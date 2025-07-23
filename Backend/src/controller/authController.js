import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/mailer.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 haneli kod
}

export async function registerUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email ve şifre zorunludur." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generateVerificationCode();
    const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 dakika geçerli
    await sql`
      INSERT INTO users (email, password_hash, is_verified, verification_code, verification_code_expires)
      VALUES (${email}, ${hashedPassword}, false, ${code}, ${expires})
    `;
    await sendVerificationEmail(email, code);
    res.status(201).json({ message: "Kayıt başarılı, lütfen e-postanı doğrula." });
  } catch (err) {
    if (err.code === "23505") {
      // unique violation
      return res.status(409).json({ error: "Bu email ile zaten bir kullanıcı var." });
    }
    res.status(500).json({ error: "Sunucu hatası." });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email ve şifre zorunludur." });
  }
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];
    if (!user) {
      return res.status(401).json({ error: "Geçersiz email veya şifre." });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Geçersiz email veya şifre." });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası." });
  }
}

export async function verifyEmail(req, res) {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: "Email ve kod zorunludur." });
  }
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }
    if (user.is_verified) {
      return res.status(400).json({ error: "E-posta zaten doğrulanmış." });
    }
    if (!user.verification_code || !user.verification_code_expires) {
      return res.status(400).json({ error: "Doğrulama kodu bulunamadı." });
    }
    if (user.verification_code !== code) {
      return res.status(400).json({ error: "Kod hatalı." });
    }
    if (new Date() > new Date(user.verification_code_expires)) {
      return res.status(400).json({ error: "Kodun süresi dolmuş." });
    }
    await sql`
      UPDATE users SET is_verified = true, verification_code = NULL, verification_code_expires = NULL WHERE email = ${email}
    `;
    res.json({ message: "E-posta başarıyla doğrulandı." });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası." });
  }
} 