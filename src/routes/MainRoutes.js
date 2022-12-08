/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AdminDashboard from 'pages/admin/AdminDashboard';
import CreateNewUser from 'pages/admin/CreateNewUser';
import PagesComponent from 'pages/admin/PagesComponent';
import CreatePages from 'pages/admin/CreatePages';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
import ViewContent from '../pages/admin/ViewContent';

// ==============================|| MAIN ROUTING ||============================== //
// let data = localStorage.getItem('admin');
// let token = JSON.parse(data);
// console.log('%%%%%%%%%%', token);
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },
        {
            path: 'admin/dashboard',
            element: <AdminDashboard />
        },
        {
            path: 'admin/createUser',
            element: <CreateNewUser />
        },
        {
            path: 'admin/pages',
            element: <PagesComponent />
        },
        {
            path: 'admin/createNewPage',
            element: <CreatePages />
        },
        {
            path: '/viewPageContent',
            element: <ViewContent />
        }
    ]
};

export default MainRoutes;
