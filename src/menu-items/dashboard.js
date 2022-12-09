// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: '',
            type: 'item',
            url: '/login',
            // icon: icons.DashboardOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
