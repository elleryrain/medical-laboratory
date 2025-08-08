import { ReactNode, StrictMode } from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/router/Router';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode> as ReactNode
);