const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection.js'); 
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
    modelName: 'comment',
  }
);

Comment.belongsTo(Post, { foreignKey: 'post_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });

module.exports = Comment;