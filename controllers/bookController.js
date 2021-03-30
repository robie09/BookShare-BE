const { Book, Category, User } = require("../db/models");

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

exports.bookSummery = async (req, res, next) => {
  try {
    res.status(200).json(req.book);
  } catch (error) {
    next(error);
  }
};

exports.bookDetail = async (req, res, next) => {
  try {
    const userId = req.book.userId;

    const bookOwner = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(201).json(bookOwner);
  } catch (error) {
    next(error);
  }
};

exports.bookCreate = async (req, res, next) => {
  try {
    if (req.file) {
      console.log(
        "🚀 ~ file: bookController.js ~ line 49 ~ exports.bookDetail= ~ userId",
        userId
      );
      console.log(
        "🚀 ~ file: bookController.js ~ line 49 ~ exports.bookDetail= ~ userId",
        userId
      );
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
