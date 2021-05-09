const { SubCategory, Category, Book } = require("../db/models");

exports.fetchSubCategory = async (subcategoryId, next) => {
	try {
		const foundSubCategory = await SubCategory.findByPk(subcategoryId);
		return foundSubCategory;
	} catch (error) {
		next(error);
	}
};

exports.subCategoryList = async (req, res, next) => {
	try {
		const _subcategorys = await SubCategory.findAll({
			attributes: req.body,
			include: {
				model: Category,
				as: "category",
			},
		});
		res.json(_subcategorys);
	} catch (error) {
		next(error);
	}
};

exports.subCategorysCreate = async (req, res, next) => {
	try {
		if (req.file) {
			req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
		}
		const newSubCategory = await SubCategory.create(req.body);
		res.status(201).json(newSubCategory);
	} catch (error) {
		next(error);
	}
};

exports.subCategoryDetail = async (req, res) => {
	res.json(req.subcategories);
};

exports.categoryCreate = async (req, res, next) => {
	try {
		req.body.subCategoryId = req.subCategory.id;
		if (req.file) {
			req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
		}
		const newCategory = await Category.create(req.body);
		res.status(201).json(newCategory);
	} catch (error) {
		next(error);
	}
};
