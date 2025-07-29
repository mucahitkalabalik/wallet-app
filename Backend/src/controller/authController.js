import { sql } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/mailer.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
}

export async function registerUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generateVerificationCode();
    const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
    await sql`
      INSERT INTO users (email, password_hash, is_verified, verification_code, verification_code_expires)
      VALUES (${email}, ${hashedPassword}, false, ${code}, ${expires})
    `;
    await sendVerificationEmail(email, code);
    res
      .status(201)
      .json({ message: "Registration successful, please verify your email." });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "A user with this email already exists." });
    }
    res.status(500).json({ error: "Server error." });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
}

export async function verifyEmail(req, res) {
  const { email, code } = req.body;
  console.log("Verifying email:", email, "with code:", code);

  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required." });
  }
  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (user.is_verified) {
      return res.status(400).json({ error: "Email is already verified." });
    }
    if (!user.verification_code || !user.verification_code_expires) {
      return res.status(400).json({ error: "Verification code not found." });
    }
    if (user.verification_code !== code) {
      return res.status(400).json({ error: "Invalid code." });
    }
    if (new Date() > new Date(user.verification_code_expires)) {
      return res.status(400).json({ error: "Code has expired." });
    }
    await sql`
      UPDATE users SET is_verified = true, verification_code = NULL, verification_code_expires = NULL WHERE email = ${email}
    `;
    res.status(200).json({ message: "Email successfully verified." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
}
