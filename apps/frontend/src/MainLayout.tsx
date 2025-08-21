import { Outlet } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Navigation } from './components/navigation/Navigation';
import { useCheckAuth } from '@/hooks/useCheckAuth';

export const MainLayout = () => {
  const { isAuthenticated, isLoading } = useCheckAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Загрузка...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Перенаправление уже выполнено в useCheckAuth
  }

  return (
    <>
      <Header />
      <div className="flex gap-12.5 ml-12.5 pt-25">
        <Navigation />
        <Outlet />
      </div>
    </>
  );
};
