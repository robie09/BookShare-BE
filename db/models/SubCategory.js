const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
	const SubCategory = sequelize.define(
		"SubCategory",
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
	SequelizeSlugify.slugifyModel(SubCategory, {
		source: ["name"],
	});
	return SubCategory;
};
