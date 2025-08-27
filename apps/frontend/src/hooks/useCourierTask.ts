import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  useGetCourierTasks,
  useCreateCourierTask,
  useTogglePaidState,
  getGetCourierTasksQueryKey,
} from '@/api/generated/courier-tasks/courier-tasks';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import {
  CreateCourierTaskDTO,
  GetCourierTasksParams,
  TogglePaidStateBody,
} from '@/api/generated/model';

export const useCourierTasks = () => {
  const { isAuthenticated, isLoading: authLoading } = useCheckAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getTasksQuery = (params: GetCourierTasksParams) =>
    useGetCourierTasks(params, {
      query: {
        enabled: isAuthenticated === true,
      },
    });

  const createTaskMutation = useCreateCourierTask({
    mutation: {
      onError: (error) => {
        console.error('Ошибка создания задачи:', error);
        const status = (error as any)?.response?.status;
        if (status === 401 || status === 403) {
          console.log('Недействительный токен, перенаправление на /auth');
          localStorage.removeItem('accessToken');
          navigate('/auth');
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetCourierTasksQueryKey({} as GetCourierTasksParams),
        });
      },
    },
  });

  const togglePaidMutation = useTogglePaidState({
    mutation: {
      onError: (error) => {
        console.error('Ошибка переключения статуса оплаты:', error);
        const status = (error as any)?.response?.status;
        if (status === 401 || status === 403) {
          console.log('Недействительный токен, перенаправление на /auth');
          localStorage.removeItem('accessToken');
          navigate('/auth');
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetCourierTasksQueryKey({} as GetCourierTasksParams),
        });
      },
    },
  });

  const createTask = (data: CreateCourierTaskDTO) => {
    if (!isAuthenticated) {
      console.log('Пользователь не авторизован, создание задачи невозможно');
      navigate('/auth');
      return;
    }
    return createTaskMutation.mutateAsync({ data });
  };

  const togglePaid = (data: TogglePaidStateBody) => {
    if (!isAuthenticated) {
      console.log(
        'Пользователь не авторизован, переключение статуса невозможно',
      );
      navigate('/auth');
      return;
    }
    return togglePaidMutation.mutateAsync({ data });
  };

  return {
    isAuthenticated,
    isLoading: authLoading,
    getTasks: getTasksQuery,
    createTask,
    togglePaid,
    createTaskStatus: createTaskMutation.status,
    togglePaidStatus: togglePaidMutation.status,
  };
};
