import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../../authentication/components/web/LoginPage';
import WelcomePage from '../../welcome/components/WelcomePage.web';
import Conference from '../../conference/components/web/Conference';
import { OriginalApp } from '../components/OriginalApp.web';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <PrivateRoute >
              <WelcomePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/:roomName'
          element={
            <PrivateRoute >
              <OriginalApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
