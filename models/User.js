const { Model } = require('sequelize'); // Import Sequelize Model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const sequelize = require('../config/connection.js'); // Import Sequelize instance

// Define User class extending Sequelize Model
class User extends Model {}

// Initialize User model
User.init(
  {
    id: {
      type: sequelize.DataTypes.INTEGER, // Integer type
      primaryKey: true, // Primary key
      autoIncrement: true // Auto-increment
    },
    username: {
      type: sequelize.DataTypes.STRING, // String type
      allowNull: false // Non-nullable
    },
    email: {
      type: sequelize.DataTypes.STRING, // String type
      allowNull: true // Nullable
    },
    password: {
      type: sequelize.DataTypes.STRING, // String type
      allowNull: true // Nullable
    }
  },
  {
    hooks: {
      // Hook to hash password before creating a new user
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash password with bcrypt
        return newUserData; // Return modified user data
      },
    },
    sequelize, // Sequelize instance
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name pluralization
    underscored: true, // Use snake_case for automatically added attributes
    modelName: 'user' // Model name
  }
);

module.exports = User; // Export User model