import React from 'react';

const Message = () => {
  return (
    <div className="message owner">
      <div className="message__info">
        <img src="https://i.imgur.com/7fKlu8K.jpeg" alt="Bean" />
        <span>Just now</span>
      </div>
      <div className="message__content">
        <p>Hello! Me is Bean</p>
        <img src="https://i.imgur.com/7fKlu8K.jpeg" alt="Bean" />
      </div>
    </div>
  );
};

export default Message;
