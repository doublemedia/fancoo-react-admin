import { Navigate, useRoutes } from 'react-router-dom';
// auth
// layouts
import GuestGuard from 'src/auth/GuestGuard';
import AuthGuard from 'src/auth/AuthGuard';
import { useRecoilValue } from 'recoil';
import menuAtom from 'src/store/atom/menuAtom';
import { ErrorBoundary } from 'react-error-boundary';
import { useMemo } from 'react';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  LoginPage,
  User,
  Block,
  Subscription,
  Test,
  Buy
} from './elements';
// import User from 'src/pages/user/user';

// ----------------------------------------------------------------------

export default function Router() {
  const menu = useRecoilValue(menuAtom);
  let move  = useMemo(()=> ('login'),[]);
  
  const menuInfo = window.localStorage.getItem('persist-auth-menu-atom');
  const userInfo = window.localStorage.getItem('persist-user-atom');
  if(menuInfo !== null && userInfo !== null) {
    move = menu[0].items[0].children[0].path;
  }
 
  return useRoutes([
    {
      path: '/',
      children: [
        { element: <Navigate to={move} replace />, index: true },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: '/user',
      element: (
        <ErrorBoundary FallbackComponent = {<Navigate to="/404" replace />}>
          {/* <AuthGuard> */}
            <DashboardLayout />
          {/* </AuthGuard> */}
        </ErrorBoundary>
      ),
      children: [
        { element: <Navigate to="/user/user" replace />, index: true },
        { path: 'user', element: <User /> },
        { path: 'block', element: <Block /> },
        { path: 'buy', element: <Buy /> },
        { path: 'subscription', element: <Subscription /> },
      ],
    },
    {
      path: '/test',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/test/test" replace />, index: true },
        { path: 'test', element: <Test /> },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
