import React from 'react';
import './Profile.css';

function Profile(props) {

  const { user, email, logout } = props;

  return (
    <div className="profile-div">
      <h1>{user}</h1>
      <h3>{email}</h3>
      <button onClick={e => logout(e)} className="btn btn-danger logout-btn">Logout</button>
    </div>
  )
}

export default Profile
