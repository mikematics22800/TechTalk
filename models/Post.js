const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection.js'); 

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    content: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'name'
      }
    }
  },
  {
    sequelize,
    modelName: 'post',
  }
);

module.exports = Post;