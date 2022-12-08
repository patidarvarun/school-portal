// assets
import { DashboardOutlined } from '@ant-design/icons';
import { FileDoneOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    FileDoneOutlined
};

// ==============================|| MENU ITEMS AFTER LOGIN - DASHBOARD ||============================== //

const pages2 = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: 'admin/dashboard',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'pages',
            title: 'Pages',
            type: 'item',
            url: 'admin/pages',
            icon: icons.FileDoneOutlined,
            breadcrumbs: false
        }
    ]
};

export default pages2;
