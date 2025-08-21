import { useState } from 'react';
import { useLoginUser } from '@/api/generated/login/login';

export const useAuth = () => {
  const [error, setError] = useState<{ message?: string } | null>(null);

  const mutation = useLoginUser({
    mutation: {
      onSuccess: (data) => {
        setError(null);
        localStorage.setItem('accessToken', String(data.accessToken || ''));
        window.location.href = '/';
      },
      onError: (err: any) => {
        // Проверяем, является ли ошибка 403
        if (err?.status === 403 || err?.response?.status === 403) {
          setError({ message: 'Неправильный логин или пароль' });
        } else {
          setError({
            message:
              err?.response?.data?.message ||
              err?.message ||
              'Ошибка авторизации. Попробуйте позже.',
          });
        }
      },
    },
  });

  return {
    ...mutation,
    error,
  };
};
