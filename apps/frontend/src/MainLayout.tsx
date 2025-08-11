// components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from './components/header/Header';
import { Navigation } from './components/navigation/Navigation';

const NavigationContainer = styled.div`
  display: flex;
  gap: 50px;
  margin-left: 50px;
  padding-top: 99px;
`;

export const MainLayout = () => (
  <>
    <Header />
    <NavigationContainer>
      <Navigation />
      <Outlet />
    </NavigationContainer>
  </>
);
