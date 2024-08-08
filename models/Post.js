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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'post',
  }
);

module.exports = Post;