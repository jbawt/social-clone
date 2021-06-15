import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Typography,
} from '@material-ui/core';
const dateFormat = require('dateformat');

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    border: '2px solid black',
    borderRadius: '10px',
    minHeight: '15vh',
    background: 'white',
    margin: '2% 0 2% 0',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1% 2% 0 2%',
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

  const formattedDate = dateFormat(date, "mmm dS h:MM TT");

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h3>{user}</h3>
        <p>{formattedDate}</p>
      </div>
      <Typography variant="h6" className={classes.content}>
        {post}
      </Typography>
    </div>
  )
}

export default FeedItem;
