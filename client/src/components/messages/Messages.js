import React from 'react';
import Message from './Message';
import './Messages.css';

function Messages({ username, users, setSelectedUser }) {
  const currentUserRemoved = users.filter(user => user.user_name !== username);

  const userList = currentUserRemoved.map((info) => {
    return <Message key={info.user_id} setSelectedUser={setSelectedUser} username={username} userInfo={info} />
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
