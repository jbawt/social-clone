import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FeedItem from './FeedItem';

const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    margin: '3% 0 0 25%',
  }
}))

function Feed({state}) {

  const classes = useStyles();

  const posts = state.posts.map((postInfo) => {
    return (
      <FeedItem postInfo={postInfo} />
    )
  })

  return (
    <div className={classes.root}>
      {posts.reverse()}
    </div>
  )
}

export default Feed
