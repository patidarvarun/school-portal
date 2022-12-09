import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../authentication/auth-forms/AuthHeader';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SimpleImageSlider from 'react-simple-image-slider';
import Example from './slider';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

function UserDashboard() {
    const [userData, setUserData] = useState();
    const [imageSlider, setImageSlider] = useState([]);
    // const images = [{ url: '/default.png' }, { url: '/default.png' }, { url: '/default.png' }, { url: '/default.png' }];

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

    // let image = userData?.slider;
    // const result = image?.split(',')[0];
    // const result1 = image?.split(',')[1];
    // const result2 = image?.split(',')[2];

    // const images = [result, result1, result2];

    // console.log('@#############', userData?.slider);
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Example slider={userData?.slider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Item>xs=4</Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default UserDashboard;
