import React from 'react'

function ChatWindow() {
  return (
    <div className="chat-container">
      <div className="chat-window">
        {/* add message containers */}
      </div>
      <div className="input-window">
        <input 
          type="textarea"
        />
        <button type="submit" className="btn btn-fill btn-success">Send</button>
      </div>
    </div>
  )
}

export default ChatWindow
