# web-dev-project
The Todo web application was built using PostgresQL - Express - React - Nodejs (PERN) tech stack

### Design Architecture
![image](https://user-images.githubusercontent.com/72519491/219484565-582fdf82-e953-4dd3-b644-7f76b7ab3000.png)

### Demo Interface
![todoapp](https://user-images.githubusercontent.com/72519491/215282425-6eeb9c64-c208-426c-ac80-89eb6d7b79dd.png)

-> How to set up the dev server:

# 1. Database:

-> Open PosgresQl and run:

$psql --username postgres

-> enter your password

CREATE DATABASE finalproject;

(enable uuid_generate_v4() extension to use)

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
  status BOOL DEFAULT FALSE,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

Schema Tables

![111111111](https://user-images.githubusercontent.com/72519491/158517780-a4b2d9a2-6a0e-4825-9438-44cb592bda61.PNG)


# 2. Front-end:
-> cd into the front-end directory

$cd todo

$npm install 

$npm start


# 3. Back-end:

-> cd into the back-end directory

-> create your env variables
$touch .env

"""
jwtSecret = "yoursecretstring"

DBpassword = "yourDataBasePassword"

"""

$cd back-end

$npm install

$nodemon server.js

# 4. Web browser demo:

localhost:3000




