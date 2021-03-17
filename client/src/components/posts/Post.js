import React from 'react';
import moment from 'moment';
import './Post.css';

function Post({postInfo}) {
  const postedAt = moment(Number(postInfo.created_at)).fromNow();

  return (
    <div className="post-container my-3">
      <h3>{postInfo.poster}</h3>
      <h5>{postInfo.post}</h5>
      <div className="actions">
        <p>{postedAt}</p>
        <div className="buttons">
          <button className="btn btn-info">Comment</button>
          <button className="btn btn-info">Like</button>
        </div>
      </div>
    </div>
  )
}

export default Post
