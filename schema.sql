DROP DATABASE IF EXISTS techtalk_db;
CREATE DATABASE techtalk_db;

-- Switch to the newly created database to continue with table creation
\c techtalk_db

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	content TEXT NOT NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

