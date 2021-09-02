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
import getInfo from '../helperFunctions/GetInfo';

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
    marginTop: '5%',
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

function Register({ setState, state }) {

  const classes = useStyles();

  const [registerInfo, setRegisterInfo] = useState({
    userName: "",
    email: "",
    password: ""
  });
  
  const handleRegisterInfo = (e, field) => {
    if (field === "email") {
      setRegisterInfo({
        ...registerInfo,
        email: e.target.value
      })
    } else if (field === "password") {
      setRegisterInfo({
        ...registerInfo,
        password: e.target.value
      })
    } else if (field === "userName") {
      setRegisterInfo({
        ...registerInfo,
        userName: e.target.value
      })
    }
  };

  const handleSubmit = () => {

    const payload = JSON.stringify(registerInfo);
    
    axios.post('http://localhost:8080/api/newUser', payload, {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
          setState({
            ...state,
            userId: response.data.data[0].user_id,
            userName: response.data.data[0].user_name,
            email: response.data.data[0].email,
            isLoggedIn: true
          });
          localStorage.setItem("token", response.data.accessToken);
          toast.success("Successfully registered", { autoClose: 3000, hideProgressBar: true });
      })
      .then(() => {
        getInfo(setState);
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
          <h1>Register</h1>
          <TextField 
            type="text" 
            className={classes.input} 
            label="Username" 
            variant="outlined" 
            value={registerInfo.userName}
            onChange={(e) => handleRegisterInfo(e, "userName")}
          />
          <TextField 
            className={classes.input} 
            label="Email" 
            variant="outlined" 
            value={registerInfo.email}
            onChange={(e) => handleRegisterInfo(e, "email")}  
          />
          <TextField 
            type="password" 
            className={classes.input} 
            label="Password" 
            variant="outlined" 
            value={registerInfo.password}
            onChange={(e) => handleRegisterInfo(e, "password")}
          />
          <div className={classes.buttons}>
            <Link className={classes.link} to="/feed">
              <Button onClick={() => handleSubmit()} variant="contained" color="primary">Register</Button>
            </Link>
            <div className={classes.align}>
              <p>Already have an account? click here</p>
              <Link className={classes.link} to="/">
                <Button variant="contained" color="secondary">Login</Button>
              </Link>
            </div>
          </div>
        </Container>
    </Container>
  )
}

export default Register
