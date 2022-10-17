import React, { useState } from 'react';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

import { BsPersonBoundingBox } from 'react-icons/bs';
import './Register.scss';

const Register = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create a user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique user avatar name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="form__logo">Firechat V2</span>
        <span className="form__name">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <input type="file" id="file" style={{ display: 'none' }} />
          <label htmlFor="file">
            <div className="icon__avatar-upload">
              <BsPersonBoundingBox />
            </div>
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign Up</button>
          {loading && 'Registering user, uploading avatar, please wait...'}
          {error && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login!</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default Register;
