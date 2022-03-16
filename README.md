# web-dev-course-final

How to set up the dev server:

1. Database:

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

Schema 
Table : users
+--------------------------------------+--------------+-----------------------+--------------------------------------------------------------+	 
|                user_id               |  user_name   |      user_email       |                        user_password                         |
+--------------------------------------+--------------+-----------------------+--------------------------------------------------------------+
| 48c41f97-f827-49ca-b811-18aa199aa091 | test         | test1@gmail.com       | $2b$12$R4DOlFF6cSmzXKu0xGMjPOc/LG8Ydbb89A0jCu8IPIblQv7xMycRq |
| deeab367-beec-426d-a4af-db52c55300d4 | test2        | test2@gmail.com       | $2b$10$4sFktVzn.NE4fVS3Qd6Zvu5Nl/dkNNRgvdDv0V4Ozs4cIx7mRnOZ2 |
| bba5e715-3e20-4e47-a8dd-f35baf09b9b0 | test3        | test3@gmail.com       | $2b$10$R.yd6T6E6P07SgxGClgqvucG9tYS1JyP.CdRFOG71Z.Yg4nxTidy. |
| a72fca8e-ed7c-4aeb-b9a6-dfbb7ec5c182 | test4        | test4@gmail.com       | $2b$10$O7cFkynGcp3IvaOo7aFf9Oa78W5vzr61GWHsDipIamI5MWRRqH5Za |
| 6dbc3a18-9552-4da5-9ac9-83fd26a9210e | test5        | test5@gmail.com       | $2b$10$fFoCpuqjaPctd8maqFxA1eOp8e6PKq/7CCyKvHehaUfT1g3VYAcZm |
| aa2890d6-ade6-49f4-9473-cb3666324ca0 | test6        | test6@gmail.com       | $2b$10$Oz08eWkA0XZ9NoV79sLsjeRJNMsoHzDOEUNqRUFL8IrfzjkKGp8US |
| e3922f7f-1b58-46cc-ab96-88f06845219f | test7        | test7@gmail.com       | $2b$10$MlwV6ODNzr.wHs0w1Su0tu2tIgeUdoYF/zazQTU319BMXEz4QERKG |
| 34714f80-9538-42a1-8c44-2e3d52637a62 | test8        | test8@gmail.com       | $2b$10$pk2Hx7G5H4swGOt9CAdPE.KsSzDxm/I/CQUJ1Gsv18M3rgn6BjWEq |
| ddc0eb60-dcad-4487-9b0f-c9a4825e4cab | test9        | test9@gmail.com       | $2b$10$zQV8KtEvY42XXCDvqjhmXOIhhDlpqfkP/FtBDc0AEpK8bSJ2qTb72 |
| de272a66-ae05-411d-8579-8c7052c2ed47 | test11       | test11@gmail.com      | $2b$10$6BnXPv/g8wxID0fAxjf2b.cKqXRtAHf4iTb2AORB1qK5AGUWwFuCy |
| 341f78ff-a8e1-4ad1-8213-3b7e7770e75c | testing1232  | test12@gmail.com      | $2b$10$QMUi/Axsm6oelEwDYlXcTe9.APHMOnZ1Z2gd3F1FHHIeNjtSJPd6y |
+--------------------------------------+--------------+-----------------------+--------------------------------------------------------------+
Table : todos
+--------+--------------------------------------+-------------------------------+
|todo_id |               user_id                |          description		      |
+--------+--------------------------------------+-------------------------------+
|      1  | 6a97a67a-db88-458e-9d4a-83fb91aba1d9 | asdasdasd3333333333333	      |  
|      3 | 3504fca5-d533-428a-80e0-726362f93d44 | clean room			              |
|      4 | 0d964a36-293e-4480-b13a-220e3470108a | 324234234			                |
|     14 | 6a97a67a-db88-458e-9d4a-83fb91aba1d9 | qweqweweqwe333333333333333333	|
|     17 | a146ea34-9fab-4b93-adf5-b91a48170e92 | 1123123			                  |
|     18 | a146ea34-9fab-4b93-adf5-b91a48170e92 | 2222222111			              |
|      5 | 10b4599b-be82-40b5-b75e-3bf75cc285d5 | qweqwe			                  |
|     36 | 6a97a67a-db88-458e-9d4a-83fb91aba1d9 | asdasd			                  |
|     37 | 8587e991-165b-4779-8b11-4b4f85ec8de2 | qweqweqweqwe			            |
|     38 | 8587e991-165b-4779-8b11-4b4f85ec8de2 | qweqweqweqwe2222              |
+--------+--------------------------------------+-------------------------------+

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

4. Web browser:
localhost:3000

