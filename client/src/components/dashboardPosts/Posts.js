import React from 'react'
import Post from './Post';

function Posts({posts}) {

  const postList = posts.map((postInfo) => {
    return (
      <Post postInfo={postInfo} />
    )
  })

  return (
    <div>
      {postList}
    </div>
  )
}

export default Posts

