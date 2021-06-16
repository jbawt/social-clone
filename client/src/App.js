import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavBar from './components/NavBar';
import Feed from './components/Feed';
import { makeStyles } from '@material-ui/styles';
import './App.css';

const useStyles = makeStyles(() => ({
  root: {
    background: 'lightslategray',
    minHeight: '94.15vh'
  },
}));

function App() {

  const classes = useStyles();

  /*
  no need to get all users, just user logged in.
  */
  const [state, setState] = useState({
    userId: 1,
    userName: 'jbawt',
    email: 'jbawtinheimer@gmail.com',
    users: [],
    posts: [],
    comments: []
  });

  const url = 'http://localhost:8080';

  useEffect(() => {
    Promise.all([
      axios.get(`${url}/api/getUsers`),
      axios.get(`${url}/api/getPosts`),
      axios.get(`${url}/api/getComments`)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        users: all[0].data,
        posts: all[1].data,
        comments: all[2].data
      }));
    });
  }, []);

  return (
    <div className={classes.root}>
      <NavBar state={state} />
      <Feed state={state} setState={setState} />
    </div>
  );
}

export default App;
