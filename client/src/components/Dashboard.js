import React, {Fragment, useState, useEffect} from 'react';
import { toast } from 'react-toastify';

const Dashboard = ({setAuth}) => {

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3003/dashboard/", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      setName(parseRes.user_name)
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
      <h1>Dashboard {name}</h1>
      <button onClick={e => logout(e)} className="btn btn-primary">Logout</button>
    </Fragment>
  )
}

export default Dashboard;
