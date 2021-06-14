import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    border: '2px solid black',
    minHeight: '15vh',
    background: 'lightslategrey',
    margin: '2% 0 2% 0',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    borderBottom: '2px solid black',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 2% 0 2%',
  }
}))

function FeedItem({postInfo}) {

  const classes = useStyles();

  const { post, user, date } = postInfo;

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>{user}</h1>
        <p>{date}</p>
      </div>
      <Typography variant="h5" className={classes.content}>
        {post}
      </Typography>
    </div>
  )
}

export default FeedItem;
