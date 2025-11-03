export const useLogout = () => {

  const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/auth';
  };

  return logout;
};
