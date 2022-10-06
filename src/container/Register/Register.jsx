import React from 'react';
import { BsPersonBoundingBox } from 'react-icons/bs';

import './Register.scss';

const Register = () => {
  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="form__logo">Firechat V2</span>
        <span className="form__name">Register</span>
        <form>
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
          <button>Sign Up</button>
        </form>
        <p>Already have an account? Login!</p>
      </div>
    </div>
  );
};

export default Register;
