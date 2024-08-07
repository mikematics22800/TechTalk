// Loading environment variables from a .env file into process.env
require('dotenv').config();

// Importing the Sequelize constructor from the sequelize package
const Sequelize = require('sequelize');

// Creating a new Sequelize instance based on environment variables
const sequelize = process.env.DB_URL
  // If DB_URL is defined in the environment variables, use it to connect
  ? new Sequelize(process.env.DB_URL)
  // Otherwise, use individual environment variables for database name, user, and password
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      // Setting the host to 'localhost'
      host: 'localhost',
      // Specifying the database dialect as 'postgres'
      dialect: 'postgres',
      // Additional options for the dialect
      dialectOptions: {
        // Enabling support for decimal numbers
        decimalNumbers: true,
      },
    });

// Exporting the sequelize instance for use in other parts of the application
module.exports = sequelize;