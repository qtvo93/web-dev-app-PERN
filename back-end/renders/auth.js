const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../validations/serverValidation");
const authorize = require("../validations/authorize");
const jwtGenerator = require("../validations/jwtGenerator");
const saltRounds = 10;

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
   //console.log(req.body);
  const { email, name, password } = req.body;

  pool.query("SELECT * FROM users WHERE user_email = $1", [email])
  .then(function (response) {
    if (response.rows.length !== 0) {
        // username already exists
        return res.status(401).send("username already exists");
    }
    bcrypt
        .hash(password, saltRounds)
        .then(function (hashedPassword) {
            pool.query(
                "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3)",
                [name, email, hashedPassword]
              )
                .then(function (response) {
                    // account successfully created
                    pool.query("SELECT * FROM users WHERE user_email = $1", [
                        email
                      ]).then(function (response) {
                    const jwtToken = jwtGenerator(response.rows[0].user_id);
                    //console.log(jwtToken);
                    res.status(200).json({ jwtToken });
                    })
                  
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send("Server error"); // server error
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send("Server error"); // server error
        });
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send("Server error"); // server error
    });
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);
  pool.query("SELECT * FROM users WHERE user_email = $1", [
    email
  ])
  .then(function (response) {
      if (response.rows.length === 0) {
          // username doesn't exist
          return res.status(401).send();
      }
      let user_password = response.rows[0].user_password;
      //console.log(user_password);
      bcrypt
          .compare(password, user_password)
          .then(function (isSame) {
              if (isSame) {
                  // password matched
                  const jwtToken = jwtGenerator(response.rows[0].user_id);
                  //console.log(jwtToken);
                  res.status(200).json({ jwtToken });
              } else {
                  // password didn't match
                  res.status(401).send("password didn't match");
              }
          })
          .catch(function (error) {
              console.log(error);
              res.status(500).send("Server error"); // server error
          });
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send("Server error"); // server error
    });
});

router.post("/verify",authorize , async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
module.exports = router;
