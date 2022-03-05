import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Helmet} from "react-helmet";
import clickHere from "./pages/Loginscript.js";

class App extends React.Component {
  render(){
    return (
      <div className = "App">
        <Helmet>
          <meta charset="utf-8" />
          <title>Log in</title>
          <script src="./pages/Loginscript.js" type="text/babel"> </script>
        </Helmet>

        <h1>Todos Site</h1>
        <div id="tobe">
        <h2>Log in</h2>

        <div>
          <div>
            <label name="username" for="username">Username:</label>
            <input type="text" id="username" />
          </div>
          <div>
            <label name="password" for="password">Password:</label>
            <input type="password" id="password" />
          </div>
        </div>

        <button id="login" onClick= {async () => {await this.clickHere();} }>Log in</button>

        <p><a href="create.html">Need an account?</a></p>
        </div>
          <div id = "user"></div>
          <div id = "message"></div>
          <div id = "createTasks"></div>
          <table>
            <tr><th>Task Pending</th></tr>
            <tbody id="tasksPending"></tbody>
          </table>
          <table>
            <tr><th>Task Done</th></tr>
            <tbody id="tasksDone"></tbody>
          </table>  
     
      </div>
    );
  }
}

export default App;
