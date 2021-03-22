import React, { useState } from 'react';
import Post from './Post';
import { toast } from 'react-toastify';
import './Posts.css';

function Posts({posts, setDashboardData, dashboardData}) {

  const [postContent, setPostContent] = useState({
    content: "",
    date: ""
  });

  const postList = posts.map((postInfo) => {
    return (
      <Post key={postInfo.id} postInfo={postInfo} />
    )
  })

  const onChange = (e) => {
    setPostContent({
      content: [e.target.value],
      date: Date.now()
    });
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      // logic for posting new posts to the database once route is created
      const body = postContent;

      const response = await fetch("http://10.0.0.102:3003/dashboard/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      setDashboardData({...dashboardData, posts: [...dashboardData.posts, parseRes]});
      setPostContent({
        content: '',
        date: '',
      });
      toast.success('Posted', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        pauseOnFocusLoss: false
      });
    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <div className="feed">
      <h1 className="feed-title">Feed</h1>
      <div className="new-post-container">
        <div className="new-post my-3">
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
      {postList.reverse()}
    </div>
  )
}

export default Posts

