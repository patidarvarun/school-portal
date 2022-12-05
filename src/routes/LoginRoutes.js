import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const ForgotPassword = Loadable(lazy(() => import('pages/authentication/ForgotPassword')));
const CreatePassword = Loadable(lazy(() => import('pages/authentication/CreatePassword')));

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'forgotPassword',
            element: <ForgotPassword />
        },
        {
            path: 'createPassword',
            element: <CreatePassword />
        }
    ]
};

export default LoginRoutes;
