import React from 'react';
import './ChatWindow.css';

function ChatWindow({ selectedUserName, setMessageData, messageData, postMessage }) {

  const { message, received } = messageData;

  const onChange = (e) => {
    setMessageData({
      received: received,
      message: e.target.value
    })
  }

  return (
    <div className="chat-container">
      <div className="message-window">
      <h3>{ selectedUserName }</h3>
        {/* add message containers */}
      </div>
      <div className="input-window">
        <input 
          type="textarea"
          className="message-input"
          placeholder="send a message..."
          value={message}
          onChange={e => onChange(e)}
        />
        <button type="submit" className="btn btn-fill btn-success" onClick={postMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatWindow
