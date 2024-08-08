const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection.js'); 
const User = require('./User.js'); 

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
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'post',
  }
);

Post.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Post;