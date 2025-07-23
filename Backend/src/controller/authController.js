import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function registerUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email ve şifre zorunludur." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql`INSERT INTO users (email, password_hash) VALUES (${email}, ${hashedPassword})`;
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
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