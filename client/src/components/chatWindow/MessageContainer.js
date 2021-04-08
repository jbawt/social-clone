// import moment from 'moment';
import React from 'react';
import './MessageContainer.css';

function MessageContainer({ messageInfo }) {
  console.log(messageInfo.message);

  return (
    <div className="message">
      <p>{ messageInfo.message }</p>
    </div>
  )
}

export default MessageContainer
