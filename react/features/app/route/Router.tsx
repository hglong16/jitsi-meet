import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../../authentication/components/web/LoginPage';
import WelcomePage from '../../welcome/components/WelcomePage.web';
import Conference from '../../conference/components/web/Conference';
import { OriginalApp } from '../components/OriginalApp.web';
import Dashboard from '../../base/dashboard/components/Dashboard';
import MeetingHistory from '../../base/meeting-history/components/MeetingHistory';
import AccountSetting from '../../base/account/components/AccountSetting';
import Support from '../../base/support/components/Support';
import Logout from '../../authentication/components/web/Logout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/logout'
          element={<Logout />}
        />
        <Route
          path='/meeting-history'
          element={
            <PrivateRoute >
              <MeetingHistory />
            </PrivateRoute>
          }
        />
        <Route
          path='/new-meeting'
          element={
            <PrivateRoute >
              <WelcomePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/account'
          element={
            <PrivateRoute >
              <AccountSetting />
            </PrivateRoute>
          }
        />
        <Route
          path='/support'
          element={
            <PrivateRoute >
              <Support />
            </PrivateRoute>
          }
        />
        <Route
          path='/'
          element={
            <PrivateRoute >
              <Dashboard />
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
