import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getShortUser } from '@/api/generated/default/default';
import { useNavigate } from 'react-router-dom';
import { GetShortUser200 } from '@/api/generated/model';

// Define the return type for the hook
interface CheckAuthResult {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: GetShortUser200 | null;
}

export const useGetShortUser = (): CheckAuthResult => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const {
    isLoading: queryLoading,
    isError,
    error,
    isSuccess,
    data,
  } = useQuery({
    queryKey: ['shortUser', token],
    queryFn: () => getShortUser(),
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (!token) {
      console.log('Токен отсутствует, перенаправление на /auth');
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/auth');
    } else if (isSuccess) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (isError) {
      console.error('Ошибка запроса /api/user/short:', error);
      const status = (error as any)?.response?.status;
      if (status === 401 || status === 403) {
        console.log(
          'Недействительный токен (401/403), перенаправление на /auth',
        );
        setIsAuthenticated(false);
        setIsLoading(false);
        localStorage.removeItem('accessToken');
        navigate('/auth');
      } else {
        console.log('Другая ошибка');
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    }
  }, [token, isSuccess, isError, error, navigate]);

  return {
    isAuthenticated,
    isLoading: isLoading || queryLoading,
    user: isSuccess ? data : null,
  };
};
