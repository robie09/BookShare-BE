module.exports = (sequelize, DataTypes) => {
	const MyBook = sequelize.define(
		"MyBook",
		{
			edition: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			typeOfCover: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			condition: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			typeOfExchange: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);

	return MyBook;
};
