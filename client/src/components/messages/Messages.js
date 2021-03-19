import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';
import './Messages.css';

const socket = io("http://localhost:3003/", {
  transports: ["websocket", "polling"]
});

function Messages({ username }) {

  const [messageData, setMessageData] = useState({
    message: "",
    received: []
  });
  const [messageSent, setMessageSent] = useState(false);

  const { message, received } = messageData;

  useEffect(() => {
    
    if (messageSent) {
      socket.emit("newMessage", {
        message: message,
        sender: username
      });
      setMessageSent(false);
    }

    socket.on("newMessage", (data) => {
  
      setMessageData({
        message: "",
        received: [...received, data]
      })
    });
  }, [
      received, 
      messageSent, 
      messageData, 
      username, 
      message
    ]
  )

  const onChange = (e) => {
    setMessageData({
      ...messageData,
      message: e.target.value
    })
  }

  const handleSubmit = () => {
    setMessageSent(true);
  }

  const messageList = received.map(info => {
    return (
      <Message messageInfo={info}/>
    )
  })

  return (
    <div className="message-container">
      <div className="message-window">
        {received.length !== 0 ? messageList : <div></div> }
      </div>
      <div className="message-input">
        <input
          type="textarea"
          placeholder="send a message"
          value={message}
          onChange={e => onChange(e)} 
        />
        <button onClick={handleSubmit} type="submit" className="btn btn-fill btn-success">Send</button>
      </div>
    </div>
  )
}

export default Messages
