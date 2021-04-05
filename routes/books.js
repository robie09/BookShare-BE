const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();
const {
  bookList,
  fetchBook,
  bookCreate,
} = require("../controllers/bookControllers");

router.param("bookId", async (req, res, next, bookId) => {
  const foundBook = await fetchBook(bookId, next);
  if (foundBook) {
    req.book = foundBook;
    next();
  } else {
    next({
      status: 404,
      message: "book not found",
    });
  }
});

router.get("/", bookList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bookCreate
);

module.exports = router;