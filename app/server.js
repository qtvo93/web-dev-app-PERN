const pg = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

// number of rounds the bcrypt algorithm will use to generate the salt
// the more rounds, the longer it takes
// so the salt will be more secure
// https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
const saltRounds = 10;

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public_html"));
app.use(express.json());

app.post("/user", function (req, res) {
    let username = req.body.username;
    let plaintextPassword = req.body.plaintextPassword;
    // TODO check body has username and plaintextPassword keys
    // TODO check password length >= 5 and <= 36
    // TODO check username length >= 1 and <= 20

    // TODO check if username already exists
    if (
        typeof username !== "string" ||
        typeof plaintextPassword !== "string" ||
        username.length < 1 ||
        username.length > 20 ||
        plaintextPassword.length < 5 ||
        plaintextPassword.length > 36
    ) {
        // username and/or password invalid
        return res.status(401).send();
    }

    pool.query("SELECT username FROM users WHERE username = $1", [username])
        .then(function (response) {
            if (response.rows.length !== 0) {
                // username already exists
                return res.status(401).send();
            }
            bcrypt
                .hash(plaintextPassword, saltRounds)
                .then(function (hashedPassword) {
                    pool.query(
                        "INSERT INTO users (username, hashed_password, tasks, status) VALUES ($1, $2, $3, $4)",
                        [username, hashedPassword,[],[]]
                    )
                        .then(function (response) {
                            // account successfully created
                            res.status(200).send();
                        })
                        .catch(function (error) {
                            console.log(error);
                            res.status(500).send(); // server error
                        });
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send(); // server error
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        });
});

app.post("/auth", function (req, res) {
    let username = req.body.username;
    let plaintextPassword = req.body.plaintextPassword;
    //let tasks = ;
    pool.query("SELECT hashed_password FROM users WHERE username = $1", [
        username,
    ])
        .then(function (response) {
            if (response.rows.length === 0) {
                // username doesn't exist
                return res.status(401).send();
            }
            let hashedPassword = response.rows[0].hashed_password;
            bcrypt
                .compare(plaintextPassword, hashedPassword)
                .then(function (isSame) {
                    if (isSame) {
                        // password matched
                        let objectRow = { rows: []};
                        pool.query("SELECT username, tasks, status FROM users WHERE username = $1", [
                            username,
                        ]) .then(function (response) {
                            objectRow["rows"]  = response.rows;
                            res.status(200).json(objectRow);
                        }).catch(function (error) {
                            console.log(error);
                            res.status(500).send(); // server error
                        });                      
                        
                    } else {
                        // password didn't match
                        res.status(401).send();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).send(); // server error
                });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        });
});

/*
app.post("/vulnerable", function (req, res) {
    let userValue = req.body.userValue;
    let myQuery = `SELECT * FROM users WHERE username = ${userValue}`;
    console.log(myQuery)
    pool.query(myQuery).then(
        function (response) {
            // do nothing
        }
    ).catch(function (error) {
        console.log(error);
    });
    res.send();
});
*/
app.post("/add", function (req, res) {
    let task = req.body.task;
    let status = req.body.status;
    let username = req.body.username;
    //console.log(task);
    pool.query(
        "UPDATE users SET tasks = array_append(tasks, $1), status = array_append(status, $2) WHERE username = $3", [
            task,status,username,]
    )
        .then(function (response) {
            // account successfully created
            res.status(200).send();
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        });
});

app.get("/add", function (req, res) {
    let username = req.query.username;
    //console.log(username);
    let objectRow = { rows: []};
    pool.query("SELECT username, tasks, status FROM users WHERE username = $1", [
        username,
    ]) .then(function (response) {
        objectRow["rows"]  = response.rows;
        res.status(200).json(objectRow);
    }).catch(function (error) {
        console.log(error);
        res.status(500).send(); // server error
    });        
});


app.post("/update", function (req, res) {
    let task = req.body.task;
    let username = req.body.username;
    let objectRow = { rows: []};
    pool.query("SELECT tasks, status FROM users WHERE username = $1", [
        username,
    ]).then(function (response) {
        let row = response.rows[0];
        let taskQuery = row.tasks;
        let statusQuery = row.status;
        for (let i=0; i < taskQuery.length; i++){
            if (taskQuery[i] == task){
                statusQuery[i] = !statusQuery[i];
                break;
            }
        }
        pool.query("UPDATE users SET status = $1 WHERE username = $2", [
            statusQuery , username,
        ])
        //res.status(200).send();
    }).then (function (){
        let objectRow = { rows: []};
        pool.query("SELECT username, tasks, status FROM users WHERE username = $1", [
                            username,
        ]) .then(function (response) {
            objectRow["rows"]  = response.rows;
            res.status(200).json(objectRow);
        }).catch(function (error) {
            console.log(error);
            res.status(500).send(); // server error
        }); 

    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(); // server error
    });        
});


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
