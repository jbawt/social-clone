import React from 'react'

function Post({postInfo}) {
  return (
    <div>
      <h3>{postInfo.poster}</h3>
      <p>{postInfo.post}</p>
    </div>
  )
}

export default Post
