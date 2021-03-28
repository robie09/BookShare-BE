const { Book, Category } = require("../db/models");

exports.fetchBook = async (bookId, next) => {
  try {
    const foundBook = await Book.findByPk(bookId);
    return foundBook;
  } catch (error) {
    next(error);
  }
};

exports.bookList = async (req, res, next) => {
  try {
    const _books = await Book.findAll({
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

exports.bookDetail = async (req, res) => {
  res.json(req.book);
};

exports.bookCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
