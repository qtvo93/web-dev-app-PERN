# web-dev-project
The Todo web application was built using PostgresQL - Express - React - Nodejs (PERN) tech stack

### Design Architecture
![image](https://user-images.githubusercontent.com/72519491/219484565-582fdf82-e953-4dd3-b644-7f76b7ab3000.png)

### Demo Interface
![todoapp](https://user-images.githubusercontent.com/72519491/215282425-6eeb9c64-c208-426c-ac80-89eb6d7b79dd.png)

### Features:

1/ Create account and Login for personal dashboard

2/ Create, edit, remove todo tasks

3/ Search for keywords

4/ Filter by Complete/Incomplete tasks

5/ Email todo list to your email

### Database Schema:

![image](https://user-images.githubusercontent.com/72519491/219490248-b975a8d9-3565-40c6-8a18-13b8c80da3fe.png)

### Database Examples:
Table users:

![image](https://user-images.githubusercontent.com/72519491/219488631-fe3e99e9-8084-4c1c-af2d-d065c3098566.png)

Table todos:

![image](https://user-images.githubusercontent.com/72519491/219488999-1c5bdc83-93cd-4f31-b837-212bd9560c98.png)

## -> How to set up the dev server on localhost:

### 1. Database:

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


### 2. Front-end:
-> cd into the front-end directory

$cd todo

$npm install 

$npm start


### 3. Back-end:

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

### 4. Web browser demo:

localhost:3000




