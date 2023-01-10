import { Navigate, useRoutes } from 'react-router-dom';
// auth
// layouts
import GuestGuard from 'src/auth/GuestGuard';
import AuthGuard from 'src/auth/AuthGuard';
import { useRecoilValue } from 'recoil';
import menuAtom from 'src/store/atom/menuAtom';
import authMenuAtom from 'src/store/atom/authMenuAtom';
import { useMemo } from 'react';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  PageOne,
  PageTwo,
  PageSix,
  PageFour,
  PageFive,
  LoginPage,
  PageThree,
  User,
  Block,
  Subscription,
  Test,
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
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/user/user" replace />, index: true },
        { path: 'user', element: <User /> },
        { path: 'block', element: <Block /> },
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
      path: '/dashboard',
      element: (
          <DashboardLayout />
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'one', element: <PageOne /> },
        { path: 'two', element: <PageTwo /> },
        { path: 'three', element: <PageThree /> },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
