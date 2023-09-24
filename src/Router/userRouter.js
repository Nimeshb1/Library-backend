import express from "express";
import { compressPassword, hashPassword } from "../helper/bycript.helper.js";
import { createUser, getUserByEmail } from "../moodle/user/usermodles.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "Here are all the users",
  });
});
router.post("/", async (req, res, next) => {
  const { email } = req.body;

  try {
    const userExist = await getUserByEmail(email);
    if (userExist) {
      return res.json({
        status: "error",
        message: "User Already exist",
      });
    }

    // encrypt password

    const hassPass = hashPassword(req.body.password);
    if (hassPass) {
      req.body.password = hassPass;
      const user = await createUser(req.body);

      if (user?._id) {
        return res.json({
          status: "success",
          message: "User has been created Sucesfully ",
        });
      }
      return res.json({
        status: "error",
        message: "Unable to create a user!!! Please try again",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    console.log(user);
    if (user?._id) {
      const isPasswordMatch = compressPassword(
        req.body.password,
        user.password
      );
      if (isPasswordMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "Login Sucesfully ",
          user,
        });
      }
    }

    res.json({
      status: "error",
      message: "Unauthorized, incorrect email and password",
    });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "sucessfully updated",
  });
});
router.delete("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "sucessfully deleted",
  });
});

export default router;
