import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Navigation } from './components/navigation/Navigation';

export const MainLayout = () => (
  <>
    <Header />
    <div className='flex gap-12.5 ml-12.5 pt-25'>
      <Navigation />
      <Outlet />
    </div>
  </>
);
