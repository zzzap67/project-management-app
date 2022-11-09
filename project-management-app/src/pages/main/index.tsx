import React from 'react';
import WelcomePage from 'pages/welcome-page/Welcome-page';
import './Main.css';
import { Routes } from 'react-router-dom';

const Main = () => {
  return (
    <div className="main">
      <WelcomePage />
    </div>
  );
};

export default Main;
