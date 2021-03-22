import React from 'react';
import ChatWindow from '../chatWindow/ChatWindow';
import './Profile.css';

function Profile(props) {

  const { user, email, logout, selectedUserName, messageData, setMessageData, postMessage } = props;

  return (
    <div className="left-container">
      <div className="profile-div">
        <h1>{user}</h1>
        <h3>{email}</h3>
        <button onClick={e => logout(e)} className="btn btn-danger logout-btn">Logout</button>
      </div>
      <div className="chat-window">
        <ChatWindow postMessage={postMessage} setMessageData={setMessageData} messageData={messageData} selectedUserName={selectedUserName}/>
      </div>
    </div>
  )
}

export default Profile
