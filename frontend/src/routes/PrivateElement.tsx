import { Loader } from 'components/Loader';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateElement: React.FC<PrivateRouteProps> = ({ element }) => {
  const { token, requesting } = useAppSelector((state) => state.auth);

  if (token) {
    return element;
  }

  return requesting
    ? <Loader />
    : <Navigate to="/login" replace />;
};
