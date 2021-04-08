const { MyBook, User, Book } = require("../db/models");

exports.myBookCreate = async (req, res, next) => {
	try {
		req.body.userId = req.user.id;
		const bookId = req.body.bookId;
		const newBook = await MyBook.create(req.body);
		await Book.update(
			{
				existing: true,
			},
			{
				where: {
					id: bookId,
				},
			}
		);
		res.status(201).json(newBook);
	} catch (error) {
		next(error);
	}
};

exports.mybookList = async (req, res, next) => {
	try {
		const _books = await MyBook.findAll({
			attributes: req.body,
			include: [
				{
					model: User,
					as: "user",
					attributes: { exclude: ["password"] },
				},
				{
					model: Book,
					as: "books",
				},
			],
		});
		res.json(_books);
	} catch (error) {
		next(error);
	}
};
