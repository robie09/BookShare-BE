"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Category.hasMany(db.Book, { foreignKey: "categoryId", as: "books" });
db.Book.belongsTo(db.Category, { foreignKey: "categoryId", as: "category" });

db.User.belongsToMany(db.Category, {
	through: db.UserCategory,
	foreignKey: "userId",
});
db.Category.belongsToMany(db.User, {
	through: db.UserCategory,
	foreignKey: "categoryId",
});

//new
db.User.hasMany(db.MyBook, { foreignKey: "userId", as: "mybooks" });
db.MyBook.belongsTo(db.User, { foreignKey: "userId", as: "user" });

//new
db.Book.hasMany(db.MyBook, { foreignKey: "bookId", as: "mybooks" });
db.MyBook.belongsTo(db.Book, { foreignKey: "bookId", as: "books" });

db.User.hasMany(db.Request, { foreignKey: "requstUserId", as: "myrequest1" });
db.Request.belongsTo(db.User, { foreignKey: "requstUserId", as: "user1" });

db.User.hasMany(db.Request, { foreignKey: "receivedUserId", as: "myrequest2" });
db.Request.belongsTo(db.User, { foreignKey: "receivedUserId", as: "user2" });

db.MyBook.belongsToMany(db.Request, {
	through: "BookRequest",
	foreignKey: "mybookId",
});
db.Request.belongsToMany(db.MyBook, {
	through: "BookRequest",
	foreignKey: "requestId",
});

module.exports = db;
