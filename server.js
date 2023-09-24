import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import morgan from "morgan";
import router from "./src/Router/userRouter.js";
import bookRouter from "./src/Router/BooksRouter.js";
import { connectDB } from "./src/dbconfig/dbconfig.js";
import transRouter from "./src/Router/transactionsRouter.js";
const app = express();
const PORT = 8000;

// mogodb connect
connectDB();

// middle ware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Global error hander
app.use((error, req, res, next) => {
  console.log(error.message);

  const errorCode = error.errorCode || 500;
  res.status(errorCode).json({
    status: "error",
    message: errorCode.message,
  });
});

// adding rounter path
app.use("/av1/users", router);
app.use("/av1/books", bookRouter);
app.use("/av1/transaction", transRouter);

// add event listerner
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is running in http://localhost:${PORT}`);
});
