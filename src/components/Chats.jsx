import React, { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    // Get chats from firestore
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(db, 'userChats', currentUser.uid),
        doc => {
          setChats(doc.data());
        }
      );

      return () => {
        unsubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = user => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <div
            className="user__chat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo?.photoURL} alt="user avatar" />
            <div className="user__chat-info">
              <span>{chat[1].userInfo?.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Chats;
