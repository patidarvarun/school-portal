// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const menuItemAfterLogin = menuItem.items.filter((item) => {
        return item.title === '';
    });
    const menuItemBeforeLogin = menuItem.items.filter((item) => {
        return item.title !== '';
    });

    let data = localStorage.getItem('token');
    let user = JSON.parse(data);
    const finalData = user?.token ? menuItemAfterLogin : menuItemBeforeLogin;

    const navGroups = finalData.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        {/* Fix - Navigation Group */}
                    </Typography>
                );
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
