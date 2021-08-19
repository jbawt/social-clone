import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Button,
  Typography,
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';

const dateFormat = require('dateformat');

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    border: '2px solid black',
    borderRadius: '10px',
    minHeight: '5vh',
    background: '#5b85aa',
    margin: '2% 0 2% 0',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1% 2% 0 2%',
    minHeight: '5vh',
  },
  title: {
    borderBottom: '2px solid black',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 2% 0 2%',
  },
  readThreadDiv: {
    width: '95%',
    marginLeft: '2%',
    padding: '0 0 0 1%',
    margin: '0 0 1% 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

function FeedItem({postInfo, comments, setSelectedPost}) {

  const classes = useStyles();

  const { post, user, date } = postInfo;
  
  const commentList = comments.filter(comment => comment.post_id === postInfo.post_id);

  const formattedDate = dateFormat(date, "mmm dS");

  const handlePostSelect = () => {
    setSelectedPost(postInfo.post_id)
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h3>{user}</h3>
        <p>{formattedDate}</p>
      </div>
      <Typography variant="h6" className={classes.content}>
        {post}
      </Typography>
      <div className={classes.readThreadDiv}>
        <Link to="/post">
          <Button onClick={() => handlePostSelect()} variant="contained">
            Read More
            <KeyboardArrowRightIcon />
          </Button>
        </Link>
        <p>Replies: { commentList.length }</p>
      </div>
    </div>
  )
}

export default FeedItem;
