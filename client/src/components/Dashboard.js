import React, {Fragment, useState, useEffect} from 'react';
import Posts from './dashboardPosts/Posts';
import { toast } from 'react-toastify';

const Dashboard = ({setAuth}) => {

  const [dashboardData, setDashboardData] = useState({
    user: "",
    email: "",
    posts: ""
  });

  const { user, email, posts } = dashboardData;

  async function getName() {
    try {
      const response = await fetch("http://localhost:3003/dashboard/", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      setDashboardData({
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
    getName();
  }, []);

  return (
    <Fragment>
      <h1>Welcome {user}</h1>
      <h2>Your email is: {email}</h2>
      <button onClick={e => logout(e)} className="btn btn-primary">Logout</button>
      <Posts posts={posts}/>
    </Fragment>
  )
}

export default Dashboard;
