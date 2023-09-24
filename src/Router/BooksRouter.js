import express, { json } from "express";
import {
  addBooks,
  borrowBooksAndUpdate,
  deleteBooks,
  getAllBooks,
  getBorrowBooks,
  showBorrowbooks,
} from "../Books/BookMoodle.js";
import { getUserId } from "../moodle/user/usermodles.js";
import {
  findTransactionAndUpdate,
  findTransactionById,
  postTransactions,
  updateTransaction,
} from "../Transactions/transactionMole.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await getAllBooks();

    res.json({
      status: "success",
      message: "Here are all the books",
      data,
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const data = await addBooks(req.body);
    console.log(data);
    if (data?._id) {
      return res.json({
        status: "success",
        message: "Book sucessfully Added",
      });
    }

    res.json({
      status: "error",
      message: "Unable to add book! please try again",
    });
  } catch (error) {
    const message = error.message;
    if (message.includes("E11000 duplicate key error collection")) {
      res.json({
        status: "error",
        message: "This books has already been added",
      });
    }
    console.log(message);
  }
});
router.post("/borrow", async (req, res, next) => {
  try {
    const { ids } = req.body;
    const { authorization } = req.headers;

    const books = await getBorrowBooks(ids);
    const user = await getUserId(authorization);
    console.log(user);

    if (books._id && user._id) {
      if (books.borrowBy.length) {
        return res.json({
          status: "error",
          message:
            "This Book Is Already been borrow and will be aviliable if it is returned",
        });
      }
      const { _id, returnDates, isbn, thumbnail, title, author, yearpublish } =
        books;
      const trans = await postTransactions(
        {
          borrowBy: {
            userId: user._id,
            userFname: user.fname,
            userLname: user.lname,
          },
          borrowsBooks: {
            isbn,
            thumbnail,
            title,
            author,
            yearpublish,
            _id,
          },
          returnDates: "",
        },
        { new: true }
      );
      if (trans?._id) {
        const updateBook = await borrowBooksAndUpdate(
          ids,
          {
            borrowBy: [...books.borrowBy, user._id],
            $unset: { returnDates: "" },
          },
          { new: true }
        );

        // Send success response after successful update
        if (updateBook) {
          return res.json({
            status: "success",
            message: "You have borrow a book",
            updateBook,
          });
        }
      }

      // Send error response if update fails or transaction could not be created
      res.json({
        status: "error",
        message: "Something went wrong please try again later",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const data = await deleteBooks(req.body.ids);

    if (data?._id) {
      return res.json({
        status: "success",
        message: "Delete Sucessfully",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/borrowBooks", async (req, res, next) => {
  try {
    const data = await showBorrowbooks(req.headers.authorization);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const books = await getBorrowBooks(req.body.ids);
    const user = await getUserId(req.headers.authorization);

    console.log(user._id);

    const transaction = await findTransactionAndUpdate(user._id, books.isbn);

    const updateTransactions = await updateTransaction(transaction._id, {
      returnDates: new Date(),
    });
    if (updateTransactions?.returnDates) {
      const updateBook = await borrowBooksAndUpdate(books._id, {
        $pull: { borrowBy: user._id },
      });

      updateBook?._id
        ? res.json({
            status: "success",
            message: "You have return your book",
            updateBook,
          })
        : res.json({
            status: "error",
            message: "Something went wrong please try again later",
          });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
