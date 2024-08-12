const { Model, DataTypes } = require('sequelize');
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8] 
      }
    }
  },
  {
    sequelize, 
    modelName: 'user',
  }
);

module.exports = User; 