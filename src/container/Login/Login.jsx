import React from 'react';

import './Login.scss';

const Login = () => {
  return (
    <div className="form__container">
      <div className="form__wrapper">
        <span className="form__logo">Firechat V2</span>
        <span className="form__name">Log in</span>
        <form>
          <input type="email" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
        </form>
        <p>You don't have an account? Register!</p>
      </div>
    </div>
  );
};

export default Login;
