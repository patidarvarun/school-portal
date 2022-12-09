import React, { useState, useEffect } from 'react';
import { Box, FormControl } from '@mui/material';
import axios from 'axios';
import authHeader from 'pages/authentication/auth-forms/AuthHeader';

const Search = () => {
    const [userData, setUserData] = useState();
    const user = localStorage.getItem('token');
    let token = JSON.parse(user);

    async function getUserData() {
        await axios
            .get(`http://103.127.29.85:3001/api/getDashboardContent`, {
                headers: authHeader()
            })
            .then((res) => {
                setUserData(res.data[0]);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                {token?.role === 'user' ? (
                    <img
                        src={`http://103.127.29.85:3001/${userData?.logo}`}
                        style={{ width: 70, height: 36, borderRadius: '5px' }}
                        alt="df"
                    ></img>
                ) : (
                    ''
                )}
            </FormControl>
        </Box>
    );
};

export default Search;
