import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getAllPlaces } from '@/api/generated/place/place';
import type { GetAllPlaces200Item } from '@/api/generated/model';

interface GetAllPlacesResult {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  places: GetAllPlaces200Item[] | null;
}

export const useGetAllPlaces = (): GetAllPlacesResult => {
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
    queryKey: ['places', token],
    queryFn: () => getAllPlaces(),
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
      console.log('Запрос /api/places успешен, данные получены');
      setIsAuthenticated(true);
      setIsLoading(false);
    } else if (isError) {
      console.error('Ошибка запроса /api/places:', error);
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
    places: isSuccess ? data : null,
  };
};
