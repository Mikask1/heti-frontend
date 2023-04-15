/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'next/router';
import * as React from 'react';

import Loading from '@/components/Loading';
import { showToast, WARNING_TOAST } from '@/components/Toast';
import api from '@/lib/api';
import { getToken, removeToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { PermissionList } from '@/types/entities/permission-list';
import { LoginRespond, User } from '@/types/entities/user';

export interface WithAuthProps {
  user: User;
}

type GeneralPermission = 'ADMIN' | 'USER' | 'auth';

const hasPermission = (user: User | null, permission: PermissionList) => {
  return permission.every((p) => user?.permissions?.includes(p));
};

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */

const ADMIN_ROUTE = '/dashboard';
const USER_ROUTE = '/dashboard/my';
const LOGIN_ROUTE = '/login';

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  routePermission: PermissionList | GeneralPermission,
  withRefetch = false
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    // Check if user is authenticated
    const checkAuth = React.useCallback(() => {
      const token = getToken();
      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          const res = await api.get<ApiReturn<LoginRespond>>('/me');
          const permissions = res.data.data.permission;

          login({
            name: res.data.data.name,
            email: res.data.data.email,
            role_id: permissions.role_id,
            role: permissions.role,
            token: token,
            permissions: permissions.routes,
            pre_event: res.data.data.pre_event,
          });
        } catch (err) {
          removeToken();
        } finally {
          stopLoading();
        }
      };
      if (!isAuthenticated || withRefetch) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);
    React.useEffect(() => {
      if (!isLoading || user?.role) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (
            routePermission === 'auth' ||
            routePermission === 'ADMIN' ||
            routePermission === 'USER' ||
            !hasPermission(user, routePermission)
          ) {
            if (query?.redirect) {
              router.replace(query.redirect as string);
            } else if (
              routePermission === 'ADMIN' ||
              routePermission === 'USER'
            ) {
              if (
                (user?.role === 'ADMIN' && routePermission === 'USER') ||
                (user?.role === 'USER' && routePermission === 'ADMIN')
              ) {
                showToast(
                  'Anda tidak memiliki akses ke halaman tersebut',
                  WARNING_TOAST
                );
                router.replace(
                  user?.role === 'ADMIN' ? ADMIN_ROUTE : USER_ROUTE
                );
              }
            } else {
              if (routePermission !== 'auth') {
                showToast(
                  'Anda tidak memiliki akses ke halaman tersebut',
                  WARNING_TOAST
                );
              }
              router.replace(user?.role === 'ADMIN' ? ADMIN_ROUTE : USER_ROUTE);
            }
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routePermission !== 'auth') {
            router.replace(
              `${LOGIN_ROUTE}?redirect=${router.asPath}`,
              `${LOGIN_ROUTE}`
            );
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, router, query, isLoading]);

    React.useEffect(() => {
      checkAuth();

      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    if (
      // If unauthenticated user want to access protected pages
      ((isLoading || !isAuthenticated) && routePermission !== 'auth') ||
      ((isLoading || isAuthenticated) &&
        routePermission === 'ADMIN' &&
        user?.role === 'USER') ||
      ((isLoading || isAuthenticated) &&
        routePermission === 'USER' &&
        user?.role === 'ADMIN') ||
      ((isLoading || isAuthenticated) &&
        routePermission !== 'auth' &&
        routePermission !== 'ADMIN' &&
        routePermission !== 'USER' &&
        !hasPermission(user, routePermission))
    ) {
      return <Loading />;
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
