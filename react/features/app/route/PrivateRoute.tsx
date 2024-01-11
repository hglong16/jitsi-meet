import React from 'react';
import { useSelector } from 'react-redux';
import { redirect, Route, RouteProps, useLocation, Navigate } from 'react-router-dom';
import { IJwtState } from '../../base/jwt/reducer';
import { IReduxState } from '../types';

const PrivateRoute = (props: RouteProps) => {
  const jwtState = useSelector<IReduxState, IJwtState>((state) => state['features/base/jwt']);
  return (
    <>{props.children}</>
  );
  // return jwtState.isAuthenticated
  //   ? (
  //     <>{props.children}</>
  //   )
  //   : (
  //     <Navigate to="/login" />
  //   );
};

export default PrivateRoute;
