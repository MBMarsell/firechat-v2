import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="navbar__logo">Firechat</span>
      <div className="navbar__user">
        <img src="https://i.imgur.com/7fKlu8K.jpeg" alt="avatar" />
        <span>Hello</span>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
