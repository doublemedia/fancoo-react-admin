import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

export const User = Loadable(lazy(() => import('../pages/user/User')));
export const Block = Loadable(lazy(() => import('../pages/user/Block')));
export const Subscription = Loadable(lazy(() => import('../pages/user/Subscription')));
export const Buy = Loadable(lazy(()=> import('../pages/user/Buy')));

export const Test = Loadable(lazy(() => import('../pages/test/test')));