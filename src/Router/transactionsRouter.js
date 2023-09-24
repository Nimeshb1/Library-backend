import express from "express";
import { getAllTransaction } from "../Transactions/transactionMole.js";
const transRouter = express.Router();

transRouter.get("/", async (req, res, next) => {
  try {
    const data = await getAllTransaction();

    res.json({ data });
    console.log(data);
    return data;
  } catch (error) {}
});

export default transRouter;
