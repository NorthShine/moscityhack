import { Loader } from 'components/Loader';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';

interface LoaderProviderProps {
  children: React.ReactNode;
}

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const { loading } = useAppSelector((state) => state.loader);

  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
};
