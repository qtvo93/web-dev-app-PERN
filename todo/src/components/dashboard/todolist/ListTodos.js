import React, { Fragment, useState, useEffect, useRef, useMemo, useCallback } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos);
  const [todos, setTodos] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  console.log(todos);

  // edit todo status

  const handleEditTodoStatus = async (id, description) => {
    try {
      const body = { description };
      console.log(body)

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setTodosChange(true);

    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>To-do Tasks</th>
            <th>Edit Task</th>
            <th>Delete</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>

          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map(todo => (
              
              <tr key={todo.todo_id}>
                <td>{todo.status ? <text style={{ textDecorationLine: 'line-through' }}>{todo.description}</text> : todo.description}</td>
                {/* <td>{todo.description}</td> */}
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>

                <td>
                  <button
                    className="btn btn-danger" 
                   onClick={() => deleteTodo(todo.todo_id)}
                  >
                    {/* ㅤㅤ ✕ ㅤㅤ */}
                    ✕ 
                  </button>
                </td>

                <td>
                  <div>
                  <input  type="checkbox" id={`specialCheckBox-${todo.todo_id}`} onChange={(e)=>{handleEditTodoStatus(todo.todo_id, e.target.checked)}} checked={todo.status}></input>
                  </div>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};


export default ListTodos;
