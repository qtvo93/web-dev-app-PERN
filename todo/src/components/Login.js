import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      ).then(async(response) =>{
        if (response.status === 200){
        const parseRes = await response.json();

        if (parseRes.jwtToken) {
          localStorage.setItem("token", parseRes.jwtToken);
          setAuth(true);
          toast.success("Logged in Successfully");
        } else {
          setAuth(false);
          console.log(response)
          toast.error(parseRes);
        }} else {
          setAuth(false);
          console.log(response)
          toast.error(response.statusText==="Unauthorized"?"Wrong email or password!":response.statusText);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          placeholder="user_email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">register</Link>
    </Fragment>
  );
};

export default Login;
