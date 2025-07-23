import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import authRoute from "./routes/authRoute.js";
import { connectToDatabase } from "./config/db.js";

dotenv.config();
const app = express();

app.use(rateLimiter);
app.use(express.json()); // Middleware to parse JSON bodies
const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoute);
app.use("/api/auth", authRoute);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}); // Start the server after connecting to the database
