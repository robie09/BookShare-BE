const { Op } = require("sequelize");
const { Book, Category } = require("../db/models");

exports.fetchBook = async (bookId, next) => {
	try {
		const foundBook = await Book.findByPk(bookId);
		return foundBook;
	} catch (error) {
		next(error);
	}
};

exports.bookListExisting = async (req, res, next) => {
	try {
		const _books = await Book.findAll({
			where: {
				existing: true,
			},
			attributes: req.body,
			include: {
				model: Category,
				as: "category",
				attributes: { exclude: ["id"] },
			},
		});
		res.json(_books);
	} catch (error) {
		next(error);
	}
};

exports.bookCreate = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
		}
		const newBook = await Book.create(req.body);
		res.status(201).json(newBook);
	} catch (error) {
		next(error);
	}
};

exports.bookShear = async (req, res, next) => {
	try {
		const name = req.body.name;
		const book = await Book.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
		});
		res.status(201).json(book);
	} catch (error) {
		next(error);
	}
};
