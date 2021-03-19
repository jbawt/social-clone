import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';
import './Messages.css';

function Messages({ username, users }) {
  
  const userList = users.map((info) => {
    return <Message key={info.user_id} username={username} userInfo={info} />
  })

  return (
    <div className="message-container">
      <div className="message-header">
        <h2>Messages</h2>
      </div>
      <div className="user-list">
        { userList }
      </div>
    </div>
  )
  
}

export default Messages
