import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 5001;

async function connectToDatabase() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    process.exit(1); // Exit the process if connection fails
  }
}

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} order by created_at DESC`;
    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions: transactions,
    });
  } catch (error) {
    console.log("Error getting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/transactions", async (req, res) => {
  // title,amount,category,user_id
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !category || !user_id || amount === undefined) {
      res.status(400).json({ message: "All fields are required" });
    }
    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})
        RETURNING *
    `;
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: transaction[0],
    });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (typeof id !== "number" || isNaN(id)) {
      return res.status(400).json({ message: "Invalid transiction id" });
    }
    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error getting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/transactions/summary/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching summary for user:", userId);

    const balanceResult = await sql`
      SELECT COALESCE( SUM(amount),0) AS balance FROM transactions WHERE user_id = ${userId}
    `;

    const inComeResult = await sql`
      SELECT COALESCE( SUM(amount),0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0
    `;
    const expenseResult = await sql`
      SELECT COALESCE( SUM(amount),0) AS expense FROM transactions WHERE user_id = ${userId} AND amount < 0
    `;
    res.status(200).json({
      message: "Summary fetched successfully",
      summary: {
        balance: balanceResult[0].balance,
        income: inComeResult[0].income,
        expense: expenseResult[0].expense,
      },
    });
  } catch (error) {
    console.log("Error summary getting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); // Start the server after connecting to the database
