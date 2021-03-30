module.exports = (sequelize, DataTypes) => {
	const Request = sequelize.define(
		'Request',
		{
			status: {
				type: DataTypes.INTEGER,
			},
		},
		{ timestamps: false }
	);
	return Request;
};
