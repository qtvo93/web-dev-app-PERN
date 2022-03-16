# web-dev-course-final

How to set up the dev server:

1. Database:

-> Open PosgresQl and run:

$psql --username postgres

-> enter your password

CREATE DATABASE finalproject;

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

Schema Tables

![111111111](https://user-images.githubusercontent.com/72519491/158517780-a4b2d9a2-6a0e-4825-9438-44cb592bda61.PNG)


2. Front-end:
-> cd into the front-end directory

$cd todo

$npm install react-toastify react-router-dom@5.3.0

$npm start


3. Back-end:

-> cd into the back-end directory

$touch db.js

-> change the password to your postgresql password

$cd back-end

$npm install pg jsonwebtoken bcrypt cors express nodemon

$nodemon server.js

4. Web browser demo:

localhost:3000

