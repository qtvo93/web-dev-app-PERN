import React, { Fragment, useState, useEffect } from "react";
import * as MdIcons from "react-icons/md";
import EditTodo from "./EditTodo";

// import styled from 'styled-components';
// import Checkbox from "react-custom-checkbox";

const ListTodos = ({ allTodos, setTodosChange }) => {
  //console.log(allTodos);
  const [todos, setTodos] = useState([]); 

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

  // edit todo status

  const handleEditTodoStatus = async (id, description) => {
    try {
      const body = { description };
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

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr style={{fontFamily: 'Source Sans Pro'}}>
            <th>To-do Tasks</th>
            <th>Edit Task</th>
            <th>Delete</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody style={{fontFamily: 'Source Sans Pro'}}>

          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            sortByKey(todos,"todo_id").map(todo => (
              
              <tr key={todo.todo_id}>
                <td style={{minWidth:"350px",maxWidth:"550px", wordBreak: "break-all"}}>{todo.status ? <text style={{ textDecorationLine: 'line-through' }}>{todo.description}</text> : todo.description}</td>
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
                    {/* ✕  */}
                    <MdIcons.MdClose size={15}/>
                  </button>
                </td>

                <td>
                  <input class="btn" style={{width: "20px",
                                height: "20px",
                                // background: "#555",
                                position: "relative",
                                // borderRadius: 3,
                                marginTop: "5px"
                              }} 
                          type="checkbox" id={`specialCheckBox-${todo.todo_id}`} onChange={(e)=>{handleEditTodoStatus(todo.todo_id, e.target.checked)}} checked={todo.status}>
                  </input>
                 
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
