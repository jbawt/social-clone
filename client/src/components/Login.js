import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

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

function Login() {

  const classes = useStyles();

  return (
    <Container>
      <h1 className={classes.title}>PosteR</h1>
      <Typography className={classes.subTitle}>
        Welcome to PosteR. A place to keep up with your friends
      </Typography>
      <Container className={classes.container}>
        <h1>Login</h1>
        <TextField className={classes.input} id="outlined-basic" label="Email" variant="outlined" />
        <TextField type="password" className={classes.input} id="outlined-basic" label="Password" variant="outlined" />
        <div className={classes.buttons}>
          <Link to='/feed'>
            <Button variant="contained" color="primary">Login</Button>
          </Link>
          <Button variant="contained" color="secondary">Register</Button>
        </div>
      </Container>
    </Container>
  )
}

export default Login
