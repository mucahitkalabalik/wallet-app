import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL);

export async function connectToDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    await sql`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL
    )`;
    try {
      await sql`ALTER TABLE users ADD COLUMN is_verified BOOLEAN DEFAULT FALSE`;
    } catch (e) {}
    try {
      await sql`ALTER TABLE users ADD COLUMN verification_code VARCHAR(10)`;
    } catch (e) {}
    try {
      await sql`ALTER TABLE users ADD COLUMN verification_code_expires TIMESTAMP`;
    } catch (e) {}
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1); // Exit the process if connection fails
  }
}
