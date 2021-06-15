import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Button,
} from '@material-ui/core';
import FeedItem from './FeedItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
    margin: '3% 0 0 25%',
    padding: '1% 0 0 0'
  },
  textField: {
    '& .MuiTextField-root': {
      width: '80%',
    },
    width: '100%',
    height: '10vh',
  },
  textFieldDiv: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
}));

function Feed({state}) {

  const classes = useStyles();

  const posts = state.posts.map((postInfo) => {
    return (
      <FeedItem postInfo={postInfo} />
    )
  })

  return (
    <div className={classes.root}>
      <form className={classes.textField}>
        <div className={classes.textFieldDiv}>
          <TextField 
            id="standard-textarea"
            label="Create Thread"
            placeholder="What's on your mind?"
            multiline
          />
          <Button variant="contained" color="primary">
            Post
          </Button>
        </div>
      </form>
      {posts.reverse()}
    </div>
  )
}

export default Feed
