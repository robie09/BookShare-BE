const { User, Book } = require("../db/models");
const bcrypt = require("bcrypt");
const upload = require("../middleware/multer");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");


exports.fetchUser = async (userId, next) => {
	try {
		const foundUser = await User.findByPk(userId);
		return foundUser;
	} catch (error) {
		next(error);
	}
};

exports.signup = async (req, res, next) => {
	const { password } = req.body;
	const saltRounds = 10;
	try {
		if (req.file) {
			req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		req.body.password = hashedPassword;
		const newUser = await User.create(req.body);
		const payload = {
			id: newUser.id,
			username: newUser.username,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			exp: Date.now() + JWT_EXPIRATION_MS,
		};
		const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
		res.status(201).json({ token });
	} catch (error) {
		next(error);
	}
};

exports.signin = (req, res) => {
	console.log('exports.signin -> req', req);

	const { user } = req;
	const payload = {
		id: user.id,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,

		exp: Date.now() + JWT_EXPIRATION_MS,
	};
	const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
	res.status(201).json({ token });
};

exports.myprofile = async (req, res, next) => {
	try {
		const user = req.user;
		const payload = {
			userId: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			image: user.image,
			mybook: await Book.findAll({
				where: { useId: user.id },
			}),
		};
		res.status(201).json(payload);
	} catch (error) {
		next(error);
	}
};

exports.updateProfile = async (req, res) => {
	try {
		if (req.file) {
			req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
		}
		await req.user.update(req.body);
		res.json(req.user);
	} catch (error) {
		console.log(error);
	}
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
