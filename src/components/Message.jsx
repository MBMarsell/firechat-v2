import React, { useContext, useRef, useEffect } from 'react';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="message__info">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="message avatar"
        />
        <span>Just now</span>
      </div>
      <div className="message__content">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt={message.senderId} />}
      </div>
    </div>
  );
};

export default Message;
