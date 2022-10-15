import React from 'react';

import { BsPaperclip, BsCardImage } from 'react-icons/bs';

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="New message..." />
      <div className="send">
        <BsPaperclip
          style={{
            height: '24px',
            cursor: 'pointer',
            color: 'var(--gray-color)',
          }}
        />
        <input type="file" style={{ display: 'none' }} id="file" />
        <label htmlFor="file">
          <BsCardImage
            style={{
              height: '24px',
              cursor: 'pointer',
              color: 'var(--gray-color)',
            }}
          />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;
