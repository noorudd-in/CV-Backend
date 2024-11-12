"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require('../utils/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 3,
          isAlphanumeric: true,
        }
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_spam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      reset_token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    user.role = 'user';
    user.is_verified = false
    user.username = user.username.toLowerCase();
  })
  return User;
};
