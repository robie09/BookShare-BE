module.exports = (sequelize, DataTypes) => {
	const UserCategory = sequelize.define(
		"UserCategory",
		{},
		{ timestamps: false }
	);
	return UserCategory;
};
