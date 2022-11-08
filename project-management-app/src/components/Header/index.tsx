import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  return (
    <header>
      <Link to="/">Main Page</Link>
      <Link to="/register">SingUp</Link>
      <Link to="/signin">SingIn</Link>
    </header>
  );
};

export default Header;
