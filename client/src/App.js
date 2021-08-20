import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar';
import Feed from './components/Feed';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';

import { makeStyles } from '@material-ui/styles';
import './App.css';
import { Fragment } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    background: 'lightslategray',
    minHeight: '100vh'
  },
}));

function App() {

  const classes = useStyles();

  /*
  no need to get all users, just user logged in.
  */
  const [state, setState] = useState({
    userId: '',
    userName: '',
    email: '',
    users: [],
    posts: [],
    comments: [],
    isLoggedIn: false,
  });

  const [selectedPost, setSelectedPost] = useState(null);

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
    <Router>
      <div className={classes.root}>
        <ToastContainer />
          <Switch>
            <Route exact path="/">
              {
                state.isLoggedIn ? 
                  <Redirect to="/feed" /> 
                  : 
                  <Login 
                    setState={setState}
                    state={state}
                  />
                  }
            </Route>
            <Route path="/register">
              <Register 
                setState={setState}
                state={state}
              />
            </Route>
            <Route path="/feed">
              {
                state.isLoggedIn ?
                  <Fragment>
                    <NavBar 
                      state={state} 
                      setState={setState}  
                    />
                    <Feed 
                      state={state} 
                      setState={setState}
                      setSelectedPost={setSelectedPost}
                    />
                  </Fragment> 
                  :
                  <Redirect to="/" />
              }
            </Route>
            <Route path="/post">
              {
                state.isLoggedIn ?
                  <Fragment>
                    <NavBar 
                      state={state}
                      setState={setState}
                    />
                    <Post 
                      selectedPost={selectedPost}
                      state={state}
                      setState={setState}
                    />
                  </Fragment>
                  :
                  <Redirect to="/" />
              }
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
