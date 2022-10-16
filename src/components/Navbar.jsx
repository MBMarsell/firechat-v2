import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="navbar__logo">Firechat</span>
      <div className="navbar__user">
        <img src={currentUser.photoURL} alt="avatar" />
        <span>Hello</span>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
