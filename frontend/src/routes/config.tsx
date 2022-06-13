import { Admin } from 'pages/Admin';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Result } from 'pages/Result';
import { Main } from '../layouts/Main';
import { PrivateElement } from './PrivateElement';

export default [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/', element: <Home />
      },
      {
        path: '/login', element: <Login />
      },
      {
        path: '/result', element: <Result />
      },
      {
        path: '/admin', element: <PrivateElement element={<Admin />} />
      }
    ]
  }
];
