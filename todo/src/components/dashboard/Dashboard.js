import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";
import SearchBar from "./todolist/SearchBar";
import Filter from "./todolist/Filter";

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

      function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }

      const userRows = sortByKey(parseData,"status")
      let userTodos = []
      let i = 0;
      for (let row of userRows){
        i++;
        let todoString = `⏳ Task no.${i} : ${row.description} - ✨Status: ${row.status?"Done":"Pending"} %0D%0A`;
        userTodos.push(todoString);
      }
      // console.log(parseData);
      const userEmail = parseData[0].user_email;
      const userName = parseData[0].user_name;
    
      let outString = "";
      for (let task of userTodos.sort()){
        outString += task;
      }
 
      function onClickEmail() {
        window.open(`mailto:${userEmail}?subject=Todo Tasks For User: ${userName}&body=${outString}`);
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

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("")

  const filteredTodos = useMemo(() => {
    return allTodos.filter(todo => {
      if (filter === "") {
        return todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      } else if (filter === "filterDone") {
        return todo.description.toLowerCase().includes(searchQuery.toLowerCase())&&todo.status===true
      } else if (filter === "filterPending") {
        return todo.description.toLowerCase().includes(searchQuery.toLowerCase())&&todo.status===false
      }
      })
  },[allTodos, searchQuery, filter])

  return (
    <div  style={{fontFamily: 'Source Sans Pro'}}>
      <div className="d-flex mt-5 justify-content-around">
        <h2 style={{fontFamily: 'Source Sans Pro'}}>✨User Name✨: {name}</h2>
        <button onClick={e => logout(e)} className="btn btn-warning">
          Logout
        </button>
      </div>

      <InputTodo setTodosChange={setTodosChange} />
      <div className="d-flex" style={{marginTop:"-15px", marginBottom: "15px"}}> 
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div style={{marginLeft:"75px"}}>
      <Filter setFilter={setFilter}/>
      </div>
      </div>
      <div className="d-flex">
        <button onClick={e => emailTodos(e)} className="btn btn-success" >
          Email tasks to yourself
        </button>
      
      </div>
      <ListTodos allTodos={filteredTodos} setTodosChange={setTodosChange} />
      
    </div>
    
    
  );
};

export default Dashboard;
