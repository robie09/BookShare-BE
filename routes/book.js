const express = require('express');
const upload = require('../middleware/multer');
const router = express.Router();
const {
	bookList,
	bookCreate,
	bookDetail,
	fetchBook,
} = require('../controllers/bookController');

router.param('bookId', async (req, res, next, bookId) => {
	const foundBook = await fetchBook(bookId, next);
	if (foundBook) {
		req.book = foundBook;
		next();
	} else {
		next({
			status: 404,
			message: 'book not found',
		});
	}
});

router.get('/', bookList);

router.get('/:bookId', bookDetail);

router.post('/', upload.single('image'), bookCreate);

module.exports = router;