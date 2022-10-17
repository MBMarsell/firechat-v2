import React, { useState, useContext } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKeyDown = e => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    // Check if the chats in firestore exist, if not create a new one
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combineId));

      if (!res.exists()) {
        // Create chat in chats collection
        await setDoc(doc(db, 'chats', combineId), { messages: [] });

        // Create userChats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combineId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + 'date']: serverTimestamp(),
        });

        // Second user
        await updateDoc(doc(db, 'userChats', user.uid), {
          [combineId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + 'date']: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true);
    }
    setUser(null);
    setUsername('');
  };

  return (
    <div className="search">
      <div className="search__form">
        <input
          type="text"
          placeholder="Search users"
          onKeyDown={handleKeyDown}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>User not found</span>}
      {user && (
        <div className="user__chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="avatar" />

          <div className="user__chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
