import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setJWT } from '../../../base/jwt/actions';

const Logout = () => {
  const dispatch = useDispatch();

  dispatch(setJWT(undefined));
  return (
    <Navigate to="/login" />
  );
};

export default Logout;