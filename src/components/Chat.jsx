import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

import Messages from './Messages';
import Input from './Input';
import {
  BsCameraVideoFill,
  BsThreeDots,
  BsFillPersonPlusFill,
} from 'react-icons/bs';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
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
