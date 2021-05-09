module.exports = (sequelize, DataTypes) => {
	const Request = sequelize.define("Request", {
		status: {
			type: DataTypes.INTEGER,
		},
		note: {
			type: DataTypes.STRING,
		},
	});
	return Request;
};
