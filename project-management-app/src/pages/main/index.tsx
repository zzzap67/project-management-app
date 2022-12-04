import WelcomePage from 'pages/welcome-page';
import './style.css';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate('/boards');
    }
  });

  return (
    <div className="main">
      <WelcomePage />
    </div>
  );
};

export default Main;
