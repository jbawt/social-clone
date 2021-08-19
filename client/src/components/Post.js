import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    margin: '3% 0 0 25%',
    padding: '1% 0 0 0'
  },
  title: {
    fontWeight: 'bolder',
    fontSize: '3em',

  },
  header: {
    border: '2px solid red',
    textAlign: 'center',
  }
}));

function Post({ selectedPost, posts, comments }) {

  const classes = useStyles();

  let post;
  for (let i = 0; i < posts.length; i++) {
    if (selectedPost === posts[i].post_id) {
      post = posts[i];
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.title}>{ post.post }</h1>
        <h4>Posted by { post.user }</h4>
      </div>
    </div>
  )
}

export default Post
