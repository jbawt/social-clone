import React, {Fragment, useState, useEffect} from 'react';
import Posts from './posts/Posts';
import Profile from './Profile/Profile';
import Messages from './messages/Messages';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

import './Dashboard.css';

const socket = io("http://10.0.0.102:3003", {
  transports: ["websocket", "polling"]
})

const Dashboard = ({setAuth}) => {

  const [dashboardData, setDashboardData] = useState({
    users: [],
    user: "",
    email: "",
    posts: []
  });

  const [selectedUser, setSelectedUser] = useState({
    selectedUserId: "",
    selectedUserName: "Chat with someone!"
  })

  const [messageData, setMessageData] = useState({
    message: "",
    received: []
  })

  const { user, email, posts, users } = dashboardData;
  const { selectedUserId, selectedUserName } = selectedUser;
  const { message, received } = messageData;

  async function getData() {
    try {
      const response = await fetch("http://10.0.0.102:3003/dashboard/", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      setDashboardData({
        users: parseRes.users,
        user: parseRes.user.user_name,
        email: parseRes.user.user_email,
        posts: parseRes.posts
      })
      setMessageData({
        ...messageData,
        received: parseRes.messages
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const postMessage = async() => {
    const body = {
      recepient_id: selectedUserId,
      message: message,
      created_at: Date.now()
    }

    try {
      const response = await fetch("http://10.0.0.102:3003/dashboard/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token
        },
        body: JSON.stringify(body)
      })

      const parseRes = await response.json();
      setMessageData({
        message: "",
        received: [...received, parseRes]
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <div className="dashboard-container">
        {user && <Profile postMessage={postMessage} selectedUserName={selectedUserName} user={user} email={email} logout={logout} setMessageData={setMessageData} messageData={messageData}/>}
        {posts && <Posts dashboardData={dashboardData} setDashboardData={setDashboardData} posts={posts}/>}
        <Messages setSelectedUser={setSelectedUser} username={user} users={users}/>
      </div>
    </Fragment>
  )
}

export default Dashboard;
