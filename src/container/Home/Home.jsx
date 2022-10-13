import React from 'react';
import { Chat, Sidebar } from '../../components';

import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
