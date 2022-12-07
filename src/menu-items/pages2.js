// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES2 ||============================== //

const pages2 = [
    {
        id: 'page1',
        title: 'Pages',
        type: 'item',
        url: '/page',
        // icon: icons.LoginOutlined,
        target: true
    },
    {
        id: 'home',
        title: 'Home',
        type: 'home',
        url: '/home',
        // icon: icons.LoginOutlined,
        target: true
    }
];

export default pages2;
