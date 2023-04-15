import Cookies from 'universal-cookie';

const cookies = new Cookies({
  secure: true,
});

export const getToken = (): string => {
  return cookies.get('@heti/token');
};

export const setToken = (token: string) => {
  cookies.set('@heti/token', token, {
    path: '/',
    secure: true,
    httpOnly: true,
  });
};

export const removeToken = () => {
  cookies.remove('@heti/token', {
    path: '/',
    secure: true,
    httpOnly: true,
  });
};
