import React from 'react';
import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IReduxState } from '../../../app/types';
import { IJwtState } from '../../jwt/reducer';
import { validateJwt } from '../../jwt/functions';

const AuthGuard = ({ children }) => {
  const jwtState = useSelector<IReduxState, IJwtState>((state) => state['features/base/jwt']);
  const isAuthenticated = validateJwt(jwtState?.jwt ?? '');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children}
    </>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
