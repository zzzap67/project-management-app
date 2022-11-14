import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import './App.css';

import Main from 'pages/main';
import Error404 from 'pages/error404';
import SignIn from 'pages/signIn';
import Boards from 'pages/boards';
import Header from './components/Header';
import Footer from './components/Footer';
import { useToken } from './api';
import Register from './pages/Register';
import EditBoardForm from 'components/Edit-board-form';
import CreateNewBoardComponentForm from 'components/Create-new-board-component-form';
import InfoTooltip from './components/InfoTooltip';
import Board from 'pages/board';
import CreateNewColumnForm from 'components/Create-new-column';

function Layout() {
  useToken();
  return (
    <>
      <div className="layout">
        <Header />
        <main className="layout_main">
          <div className="outlet">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
      <div id="modal"></div>
    </>
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
            <Route path="/boards/create" element={<CreateNewBoardComponentForm />} />
            <Route path="/board/:id/column" element={<CreateNewColumnForm />} />
            <Route
              path="/board/:id"
              element={
                <Board />
                // <div>{location.pathname}</div>
              }
            />
            <Route path="/board/:id/edit" element={<EditBoardForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        </Routes>
        <InfoTooltip />
      </Provider>
    </div>
  );
}

export default App;
