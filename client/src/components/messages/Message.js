import React from 'react';
import './Message.css'

function Message({ userInfo, setSelectedUser }) {
  // const [messageData, setMessageData] = useState({
  //   message: "",
  //   received: []
  // });
  // const [messageSent, setMessageSent] = useState(false);

  // const { message, received } = messageData;

  // useEffect(() => {
    
  //   if (messageSent) {
  //     socket.emit("newMessage", {
  //       message: message,
  //       sender: username
  //     });
  //     setMessageSent(false);
  //   }

  //   socket.on("newMessage", (data) => {
  
  //     setMessageData({
  //       message: "",
  //       received: [...received, data]
  //     })
  //   });
  // }, [
  //     received, 
  //     messageSent, 
  //     messageData, 
  //     username, 
  //     message
  //   ]
  // )

  // const onChange = (e) => {
  //   setMessageData({
  //     ...messageData,
  //     message: e.target.value
  //   })
  // }

  // const handleSubmit = () => {
  //   setMessageSent(true);
  // }

  // const messageList = received.map(info => {
  //   return (
  //     <Message messageInfo={info}/>
  //   )
  // })

  // return (
  //   <div className="message-container">
  //     <div className="message-window">
  //       {received.length !== 0 ? messageList : <div></div> }
  //     </div>
  //     <div className="message-input">
  //       <input
  //         type="textarea"
  //         placeholder="send a message"
  //         value={message}
  //         onChange={e => onChange(e)} 
  //       />
  //       <button onClick={handleSubmit} type="submit" className="btn btn-fill btn-success">Send</button>
  //     </div>
  //   </div>
  // )

  const handleSelect = () => {
    setSelectedUser({
      selectedUserId: userInfo.user_id,
      selectedUserName: userInfo.user_name
    })
  }

  return (
    <div onClick={handleSelect} className="message-box">
      <h3>{userInfo.user_name}</h3>
    </div>
  )
}

export default Message
