const router = require("express").Router();
const pool = require("../db");
const authorize = require("../validations/authorize");
//all todos and name

router.get("/",authorize , async (req, res) => {
  try {

    const user = await pool.query(
      "SELECT u.user_email, u.user_name, t.todo_id, t.description, t.status FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a todo

router.post("/todos", authorize , async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description, status) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, description, false]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

router.put("/todos/:id",authorize , async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (typeof(description) === "boolean") {
      
      const updateTodo = await pool.query(
        "UPDATE todos SET status = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, req.user.id]
      );

      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
  
      res.json("Todo was updated");
    } else {
  
      const updateTodo = await pool.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, req.user.id]
      );

      if (updateTodo.rows.length === 0) {
        return res.json("This todo is not yours");
      }
  
      res.json("Todo was updated");

    } 

  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/todos/:id", authorize , async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
