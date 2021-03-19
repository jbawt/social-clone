import React, {Fragment, useState, useEffect} from 'react';
import Posts from './posts/Posts';
import Profile from './Profile/Profile';
import Messages from './messages/Messages';
import { toast } from 'react-toastify';

import './Dashboard.css';

const Dashboard = ({setAuth}) => {

  const [dashboardData, setDashboardData] = useState({
    users: [],
    user: "",
    email: "",
    posts: []
  });

  const { user, email, posts, users } = dashboardData;

  async function getData() {
    try {
      const response = await fetch("http://localhost:3003/dashboard/", {
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
    } catch (error) {
      console.error(error.message)
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
        {user && <Profile user={user} email={email} logout={logout}/>}
        {posts && <Posts dashboardData={dashboardData} setDashboardData={setDashboardData} posts={posts}/>}
        <Messages username={user} users={users}/>
      </div>
    </Fragment>
  )
}

export default Dashboard;
