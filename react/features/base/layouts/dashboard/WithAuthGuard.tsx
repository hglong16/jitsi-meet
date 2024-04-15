import React, { FC, ReactNode } from 'react';
import AuthGuard from './AuthGuard';

export const WithAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
