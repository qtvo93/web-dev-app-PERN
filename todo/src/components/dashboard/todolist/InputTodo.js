import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const InputTodo = ({ setTodosChange }) => {
  toast.configure();
  const [description, setDescription] = useState("");
 
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      if (description === "") {
        alert("Please add your task description")
        return
      }

      const body = { description };
     
      const response = await fetch("http://localhost:5000/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      if (parseResponse.todo_id){
        toast.success("Added task successfully");
      }

      setTodosChange(true);
      setDescription("");

    } catch (err) {
      console.error(err.message);
      toast.error("Errors adding task! Please try again later")
    }
  };

  

  return (
    <Fragment>
      <h1 className="text-center my-5">Todo App</h1>
      <form className="d-flex" onSubmit={onSubmitForm} style={{fontFamily: 'Source Sans Pro'}}>
        <input
          type="text"
          placeholder="Add task"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
     
    </Fragment>
  );
};

export default InputTodo;
