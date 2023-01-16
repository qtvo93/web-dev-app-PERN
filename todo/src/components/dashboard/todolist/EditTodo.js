import React, { Fragment, useState } from "react";
import * as MdIcons from "react-icons/md";

const EditTodo = ({ todo, setTodosChange }) => {
  //editText function

  const editText = async id => {
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

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [description, setDescription] = useState(todo.description);
  return (
    <Fragment>
      <div style={{fontFamily: 'Source Sans Pro'}}>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        <MdIcons.MdEdit size={15}/>
      </button>
      {/* id = "id21"*/}
      <div
        className="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" style={{fontFamily: 'Source Sans Pro'}}>Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(todo.todo_id)}
                style={{fontFamily: 'Source Sans Pro'}}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
                style={{fontFamily: 'Source Sans Pro'}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;
