import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const emailTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      const user_rows = parseData;
      let user_todos = []
      let i = 0;
      for (let row of user_rows){
        i++;
        let todo_string = `⏳ Task no.${i} : ${row.description} `;
        user_todos.push(todo_string );
      }
      // console.log(parseData);
      const user_email = parseData[0].user_email;
      const user_name = parseData[0].user_name;
      //console.log(user_todos);
      // console.log(parseData[0].user_email);
      let out_string = "";
      for (let task of user_todos){
        out_string += task;
      }
      out_string += "⏳";
      function onClickEmail() {
        window.open(`mailto:${user_email}?subject=Todo Tasks For User: ${user_name}&body=${out_string}`);
      }
      onClickEmail();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>user name: {name}</h2>
        <button onClick={e => logout(e)} className="btn btn-warning">
          Logout
        </button>
      </div>

      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
      <div className="d-flex mt-5 justify-content-around">
        <button onClick={e => emailTodos(e)} className="btn btn-warning">
          Email todo tasks to yourself
        </button>
      </div>
    </div>
    
    
  );
};

export default Dashboard;
