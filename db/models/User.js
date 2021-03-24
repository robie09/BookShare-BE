module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },

    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
  });
  return User;
};
