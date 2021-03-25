const { Category, Book } = require('../db/models');

exports.fetchCategory = async (categoryId, next) => {
	try {
		const foundCategory = await Category.findByPk(categoryId);
		return foundCategory;
	} catch (error) {
		next(error);
	}
};

exports.categoryList = async (req, res, next) => {
	try {
		const _categorys = await Category.findAll({
			attributes: req.body,
			include: {
				model: Book,
				as: 'books',
			},
		});
		res.json(_categorys);
	} catch (error) {
		next(error);
	}
};

exports.categoryDetail = async (req, res) => {
	res.json(req.category);
};

exports.categoryCreate = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `http://${req.get('host')}/media/${req.file.filename}`;
		}
		const newCategory = await Category.create(req.body);
		res.status(201).json(newCategory);
	} catch (error) {
		next(error);
	}
};
