const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
	const Category = sequelize.define(
		"Category",
		{
			name: {
				type: DataTypes.STRING,
			},
			slug: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false }
	);
	SequelizeSlugify.slugifyModel(Category, {
		source: ["name"],
	});
	return Category;
};
