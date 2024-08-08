const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection.js'); 
const User = require('./User.js');
const Post = require('./Post.js'); 

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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'post',
  }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = Comment;