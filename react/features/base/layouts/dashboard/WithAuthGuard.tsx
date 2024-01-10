import React, { FC, ReactNode } from 'react';
import AuthGuard from './AuthGuard';

export const withAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
