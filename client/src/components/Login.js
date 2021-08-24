import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  container: {
    width: '30vw',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid black',
    borderRadius: '10px',
    position: 'relative',
    top: '20vh',
    backgroundColor: '#5b7bbd',
  },
  input: {
    width: '50%',
    marginTop: '10%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    marginTop: '5%',
    textDecorationLine: 'none',
  },
  align: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bolder',
    fontSize: '5em',
    textAlign: 'center',
    borderBottom: '2px solid black',
    marginTop: 0,
    position: 'relative',
    top: '5vh',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: '1.5em',
    position: 'relative',
    top: '5vh',
  },
  link: {
    textDecoration: 'none',
  }
}));

function Login({ setState, state }) {

  const classes = useStyles();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });
  
  const handleLoginInfo = (e, field) => {
    if (field === "email") {
      setLoginInfo({
        ...loginInfo,
        email: e.target.value
      })
    } else if (field === "password") {
      setLoginInfo({
        ...loginInfo,
        password: e.target.value
      })
    }
  };

  const handleSubmit = () => {

    const payload = JSON.stringify(loginInfo);
    
    axios.post('http://localhost:8080/api/login', payload, {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (response.data.access === "denied" ) {
          toast.warn("Invalid login credentials", { hideProgressBar: true, position: toast.POSITION.TOP_CENTER })
        } else {
          setState({
            ...state,
            userId: response.data.data[0].user_id,
            userName: response.data.data[0].user_name,
            email: response.data.data[0].email,
            token: response.data.accessToken,
            isLoggedIn: true
          })
          toast.success("Login successful", { autoClose: 3000, hideProgressBar: true });
        }
        // return response;
      })
      .then(() => {
        const url = 'http://localhost:8080';
        const options = {
          headers: {
            'authorization': state.token
          }
        }

          Promise.all([
            axios.get(`${url}/api/getUsers`, options),
            axios.get(`${url}/api/getPosts`, options),
            axios.get(`${url}/api/getComments`, options)
          ]).then((all) => {
            setState((prev) => ({
              ...prev,
              users: all[0].data,
              posts: all[1].data,
              comments: all[2].data
            }));
          });
      })
      .catch(err => console.log(err));
  }

  return (
    <Container>
      <h1 className={classes.title}>PosteR</h1>
      <Typography className={classes.subTitle}>
        Welcome to PosteR. A place to keep up with your friends
      </Typography>
        <Container className={classes.container}>
          <h1>Login</h1>
          <TextField 
            className={classes.input} 
            label="Email" 
            variant="outlined" 
            value={loginInfo.email}
            onChange={(e) => handleLoginInfo(e, "email")}  
          />
          <TextField 
            type="password" 
            className={classes.input} 
            label="Password" 
            variant="outlined" 
            value={loginInfo.password}
            onChange={(e) => handleLoginInfo(e, "password")}
          />
          <div className={classes.buttons}>
            <Link className={classes.link} to="/feed">
              <Button onClick={() => handleSubmit()} variant="contained" color="primary">Login</Button>
            </Link>
            <div className={classes.align}>
              <p>Don't have an account? click here</p>
              <Link className={classes.link} to="/register">
                <Button variant="contained" color="secondary">Register</Button>
              </Link>
            </div>
          </div>
        </Container>
    </Container>
  )
}

export default Login
