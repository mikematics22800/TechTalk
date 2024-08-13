const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection.js'); 

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
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
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'comment',
  }
);

module.exports = Comment;