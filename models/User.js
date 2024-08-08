const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); 
const sequelize = require('../config/connection.js');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true 
    }
  },
  {
    hooks: {
      // Hook to hash password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); 
        return newUserData; 
      },
    },
    sequelize, 
    modelName: 'user',
  }
);

module.exports = User; 