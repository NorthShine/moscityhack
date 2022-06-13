import React from 'react';
import { Alert } from '../components/Alert';

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => (
  <>
    {children}
    <Alert />
  </>
);
