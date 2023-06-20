import Cookies from 'universal-cookie';

const cookies = new Cookies({
  secure: true,
});

export const getToken = (): string => {
  return cookies.get('@kango/token');
};

export const setToken = (token: string) => {
  cookies.set('@kango/token', token, {
    path: '/',
    secure: true,
    httpOnly: true,
  });
};

export const removeToken = () => {
  cookies.remove('@kango/token', {
    path: '/',
    secure: true,
    httpOnly: true,
  });
};
