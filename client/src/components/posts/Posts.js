import React, { useState } from 'react';
import Post from './Post';
import './Posts.css';

function Posts({posts, setDashboardData, dashboardData}) {

  const [postContent, setPostContent] = useState({
    content: ""
  });

  const postList = posts.map((postInfo) => {
    return (
      <Post key={postInfo.id} postInfo={postInfo} />
    )
  })

  const onChange = (e) => {
    setPostContent({[e.target.name]: [e.target.value]});
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // logic for posting new posts to the database once route is created
      const body = postContent;

      const response = await fetch("http://localhost:3003/dashboard/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      setDashboardData({...dashboardData, posts: [...dashboardData.posts, parseRes]});
      // console.log(parseRes);
      
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <div className="feed">
      <div className="new-post-container">
        <div className="new-post my-5">
          <h3>Make a post:</h3>
          <form onSubmit={handleSubmitForm}>
            <textarea
              name="content"
              placeholder="Type post here"
              value={postContent.content}
              onChange={(e) => onChange(e)}
            />
            <button type="submit" className="btn btn-success submit-btn">Post</button>
          </form>
        </div>
      </div>
      {postList}
    </div>
  )
}

export default Posts

