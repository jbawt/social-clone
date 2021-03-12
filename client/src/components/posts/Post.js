import React from 'react';
import './Post.css';

function Post({postInfo}) {
  return (
    <div className="post-container my-3">
      <h3>{postInfo.poster}</h3>
      <p>{postInfo.post}</p>
    </div>
  )
}

export default Post
