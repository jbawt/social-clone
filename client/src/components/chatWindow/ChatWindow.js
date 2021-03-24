import React from 'react';
import MessageContainer from './MessageContainer';
import './ChatWindow.css';

function ChatWindow({ selectedUserName, selectedUserId, setMessageData, messageData, postMessage }) {

  const { message, received, userId } = messageData;

  const onChange = (e) => {
    setMessageData({
      ...messageData,
      message: e.target.value
    })
  }

  const sentMessages = received.filter(message => {
    return message.recepient_id === selectedUserId && message.sender_id === userId;
  });

  const receivedMessages = received.filter(message => {
    return message.recepient_id === userId && message.sender_id === selectedUserId;
  })

  const messages = [...receivedMessages, ...sentMessages];

  const messageList = messages.map(message => {
    return (
      <MessageContainer 
        key={message.message_id} 
        messageInfo={message}
      />
    )
  })

  return (
    <div className="chat-container">
      <div className="message-window">
      <h3>{ selectedUserName }</h3>
        { messageList }
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
