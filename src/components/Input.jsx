import React, { useState, useContext } from 'react';
import {
  arrayUnion,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { v4 as uuid } from 'uuid';
import { db, storage } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { BsPaperclip, BsCardImage } from 'react-icons/bs';

const Input = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        error => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="New message..."
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <BsPaperclip
          style={{
            height: '24px',
            cursor: 'pointer',
            color: 'var(--gray-color)',
          }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <BsCardImage
            style={{
              height: '24px',
              cursor: 'pointer',
              color: 'var(--gray-color)',
            }}
          />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
