import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import './App.css';

import Main from 'pages/main';
import Error404 from 'pages/error404';
import RegistrationForm from 'pages/registrationForm';
import SignIn from 'pages/signIn';
import Boards from 'pages/boards';
import Header from './components/Header';
import Footer from './components/Footer';
import { useError } from './errors';
import { useToken } from './api';

function Layout() {
  useError();
  useToken();
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/board/:id" element={<div>{location.pathname}</div>} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
