import React from 'react';

import Messages from './Messages';
import Input from './Input';
import {
  BsCameraVideoFill,
  BsThreeDots,
  BsFillPersonPlusFill,
} from 'react-icons/bs';

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__info">
        <span>Bean</span>
        <div className="chat__icons">
          <BsCameraVideoFill style={{ height: '24px' }} />
          <BsFillPersonPlusFill style={{ height: '24px' }} />
          <BsThreeDots style={{ height: '24px' }} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
