import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Button,
} from '@material-ui/core';
import FeedItem from './FeedItem';
import dateFormat from 'dateformat';

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

function Feed({state, setState, setSelectedPost}) {
  
  const classes = useStyles();
  const url = 'http://localhost:8080';
  
  const [postContent, setPostContent] = useState('');

  const handlePostContent = (e) => {
    setPostContent(e.target.value);
  }

  const handleSubmit = () => {

    const postData = {
      userId: `${state.userId}`,
      content: postContent,
      postDate: dateFormat(Date.now(), 'isoUtcDateTime')
    };

    axios.post(`${url}/api/newPost`, postData)
    .then(() => {
      const newPost = {
        user: state.userName,
        post: postContent,
        date: postData.postDate
      }
      setState({
        ...state,
        posts: [newPost, ...state.posts]
      })
      console.log(state.posts);
    })
    .catch(err => console.log(err)); 
    
    setPostContent('');
  }

  const posts = state.posts.map((postInfo) => {
    return (
      <FeedItem 
        key={postInfo.post_id}
        postInfo={postInfo} 
        comments={state.comments}
        setSelectedPost={setSelectedPost}
      />
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
            onChange={e => handlePostContent(e)}
            value={postContent}
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => handleSubmit()}  
          >
            Post
          </Button>
        </div>
      </form>
      {posts}
    </div>
  )
}

export default Feed
