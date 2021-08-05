import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

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
    justifyContent: 'space-evenly',
    width: '50%',
    marginTop: '5%',
    textDecorationLine: 'none',
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
          console.log("unauthorized");
        } else {
          setState({
            ...state,
            userId: response.data[0].user_id,
            userName: response.data[0].user_name,
            email: response.data[0].email,
            isLoggedIn: true
          })
        }
      })
      .then(() => {
        console.log(state);
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
          <Link to="/feed">
            <Button onClick={() => handleSubmit()} variant="contained" color="primary">Login</Button>
          </Link>
          <Button variant="contained" color="secondary">Register</Button>
        </div>
      </Container>
    </Container>
  )
}

export default Login
