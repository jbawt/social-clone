import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const dateFormat = require('dateformat');

const useStyles = makeStyles(() => ({
  root: {
    border: '2px solid black',
    borderRadius: '10px',
    width: '70%',
    margin: '3% 0 0 13%',
    padding: '0 2% 0 2%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#5b85aa',
  }
}))

function CommentBox(props) {

  const { userName, date, content } = props

  const classes = useStyles();
  const formattedDate = dateFormat(date, "mmm dS")

  return (
    <div className={classes.root}>
      <h3>{userName}</h3>
      <Typography>
        { content }
      </Typography>
      <p>{ formattedDate }</p>
      
    </div>
  )
}

export default CommentBox;