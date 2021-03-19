import React from 'react';
import './Message.css'

function Message({ messageInfo }) {
  return (
    <div className="message-box">
      <h3>{ messageInfo.sender }</h3>
      <p>{ messageInfo.message }</p>
    </div>
  )
}

export default Message
