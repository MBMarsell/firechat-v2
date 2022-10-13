import React from 'react';

const Search = () => {
  return (
    <div className="search">
      <div className="search__form">
        <input type="text" placeholder="Search users" />
      </div>
      <div className="user__chat">
        <img src="https://i.imgur.com/7fKlu8K.jpeg" alt="avatar" />

        <div className="user__chat-info">
          <span>Bean</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
