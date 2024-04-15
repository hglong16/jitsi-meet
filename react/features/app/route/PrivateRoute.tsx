import React from 'react';
import { useSelector } from 'react-redux';
import { redirect, Route, RouteProps, useLocation, Navigate } from 'react-router-dom';
import { IJwtState } from '../../base/jwt/reducer';
import { IReduxState } from '../types';
import { validateJwt } from '../../base/jwt/functions';

const PrivateRoute = (props: RouteProps) => {
  const jwtState = useSelector<IReduxState, IJwtState>((state) => state['features/base/jwt']);
  // return (
  //   <>{props.children}</>
  // );
  try {
    const errors: Object[] = validateJwt(jwtState?.jwt || '');
    if (errors.length > 0) {
      return (
        <Navigate to="/login" />
      );
    }
    return (
      <>{props.children}</>
    );
  } catch (error) {
    return (
      <Navigate to="/login" />
    );
  }
  // return jwtState.isAuthenticated
  //   ? (
  //     <>{props.children}</>
  //   )
  //   : (
  //     <Navigate to="/login" />
  //   );
};

export default PrivateRoute;
