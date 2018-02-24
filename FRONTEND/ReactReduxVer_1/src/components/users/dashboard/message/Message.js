import React, { Component } from 'react';
import Moment from 'react-moment';

const Message = (props) => {
  return (
    <div className={`bubble bubble-${props.sender}`}>
      <span className="bubble-triangle"/>
      {props.message.contents}
    </div>
  )
}

export default Message;