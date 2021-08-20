import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import CommentBox from './CommentBox';

const dateFormat = require('dateformat');

const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    margin: '3% 0 0 25%',
    padding: '1% 0 0 0',
  },
  title: {
    fontWeight: 'bolder',
    fontSize: '3em',

  },
  header: {
    border: '2px solid black',
    borderRadius: '10px',
    textAlign: 'center',
    background: 'white',
  },
  input: {
    width: '90%',
  },
  newCommentBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2%'
  }
}));

function Post({ selectedPost, state, setState }) {

  const { users, posts, comments } = state;

  const classes = useStyles();
  const commentList = comments.filter(comment => comment.post_id === selectedPost);
  const [newComment, setNewComment] = useState('');

  let newCommentList = [];
  let post;

  for (let i = 0; i < posts.length; i++) {
    if (selectedPost === posts[i].post_id) {
      post = posts[i];
    }
  }

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < commentList.length; j++) {
      if (users[i].user_id === commentList[j].user_id) {
        const comment = {
          userName: users[i].user_name,
          content: commentList[j].content,
          date: commentList[j].comment_date,
          commentId: commentList[j].comment_id
        }
        newCommentList.push(comment);
      }
    }
  }

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  }

  const handleSubmit = () => {

    const comment = {
      userId: state.userId,
      postId: selectedPost,
      content: newComment,
      commentDate: dateFormat(Date.now(), 'isoUtcDateTime')
    }

    axios.post('http://localhost:8080/api/newComment', comment)
      .then(() => {
        setState({
          ...state,
          comments: [comment, ...state.comments]
        })
      })
      .catch(err => console.log(err));

    setNewComment('');
  }
  
  const postCommentList = newCommentList.map((commentInfo) => {
    return(
      <CommentBox 
        key={commentInfo.commentId}
        userName={commentInfo.userName}
        content={commentInfo.content}
        date={commentInfo.date}
      />
    )
  })

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>{ post.post }</h1>
        <h4>Posted by { post.user }</h4>
      </div>
      <div className={classes.newCommentBox}>
        <TextField
            className={classes.input}
            type="text"
            label="Comment"
            value={newComment}
            onChange={(e) => handleNewComment(e)}
        />
        <Button onClick={() => handleSubmit()} variant="contained" color="primary">
          Submit
        </Button>
      </div>
      { postCommentList.reverse() }
    </div>
  )
}

export default Post
