import { sql } from "../config/db.js";

// ✅ Tüm transaction'ları userId'ye göre getir
export async function getTransactionsByUserId(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const transactions = await sql`
      SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    console.log("Error getting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Yeni transaction oluştur
export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !category || !user_id || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parsedUserId = parseInt(user_id, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: "Invalid user_id" });
    }

    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${parsedUserId}, ${title}, ${amount}, ${category})
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
}

// ✅ Transaction sil
export async function deleteTransaction(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.log("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Kullanıcının gelir/gider/bakiye özetini getir
export async function getSummaryById(req, res) {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const [balanceResult] = await sql`
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM transactions
      WHERE user_id = ${userId}
    `;

    const [incomeResult] = await sql`
      SELECT COALESCE(SUM(amount), 0) AS income
      FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;

    const [expenseResult] = await sql`
      SELECT COALESCE(SUM(amount), 0) AS expense
      FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      message: "Summary fetched successfully",
      summary: {
        balance: balanceResult.balance,
        income: incomeResult.income,
        expense: expenseResult.expense,
      },
    });
  } catch (error) {
    console.log("Error getting summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
