import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import './App.css';

import Main from 'pages/main';
import Error404 from 'pages/error404';
import RegistrationForm from 'pages/registrationForm';
import SignIn from 'pages/signIn';
import Header from './components/Header';
import Footer from 'components/Footer/Footer';

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout_main">
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
