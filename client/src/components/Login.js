import React, {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import './Login.css';

const Login = ({setAuth}) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const onSubmitForm = async(e) => {
    e.preventDefault();

    try {
      const body = {email, password}

      const response = await fetch("http://192.168.1.73:3003/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("login successful")
      } else {
        setAuth(false)
        toast.error(parseRes);
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Fragment>
      <h1 className="text-center my-2">Login</h1>
      <form onSubmit={onSubmitForm} className="login-form bg-secondary w-75 px-5 mx-auto">
        <input 
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={e => onChange(e)}
        />
        <input 
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={e => onChange(e)}
        />
        <button className="btn btn-success btn-block">Login</button>
      <Link to="/register">Register</Link>
      </form>
    </Fragment>
  )
}

export default Login;