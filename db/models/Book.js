const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define(
		"Book",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			slug: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			author: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			author: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			existing: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{ timestamps: false }
	);
	SequelizeSlugify.slugifyModel(Book, {
		source: ["name"],
	});
	return Book;
};
