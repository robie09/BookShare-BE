const express = require("express");
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();
const {
	bookListExisting,
	fetchBook,
	bookCreate,
	bookSearch,
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

router.get("/", bookListExisting);

router.post("/", upload.single("image"), bookCreate);

router.get("/booksearch/:name", bookSearch);

module.exports = router;
