import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL);

export async function connectToDatabase() {
  try {
    // Users tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        verification_code VARCHAR(10),
        verification_code_expires TIMESTAMP
      );
    `;

    // Transactions tablosu
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      );
    `;

    // Transactions sequence'i otomatik güncelle
    const seqResult = await sql`
      SELECT pg_get_serial_sequence('transactions', 'id') AS seq_name;
    `;

    const seqName = seqResult[0]?.seq_name;
    if (seqName) {
      await sql`
        SELECT setval(${seqName}, (SELECT COALESCE(MAX(id), 0) FROM transactions) + 1);
      `;
    }

    console.log("✅ Database connected, tables ensured, sequence fixed.");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
}
