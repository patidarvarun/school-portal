/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from '../authentication/auth-forms/AuthHeader';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Example from './slider';
import { toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

function UserDashboard() {
    const [userData, setUserData] = useState();
    const cssfont = {
        color: 'black',
        fontSize: '26px'
    };
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

    console.log('userData##########', userData);
    return (
        <div>
            {userData && (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Example slider={userData?.slider.split(',')} />
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <div style={{ textAlign: 'left' }}>
                                    <p style={cssfont}>{userData?.staticContent}</p>
                                    <p style={cssfont}>{userData?.staticContent}</p>
                                    <p style={cssfont}>{userData?.staticContent}</p>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <div>
                                    <h3 style={{ textAlign: 'left' }}>Footer</h3>
                                </div>

                                <div style={{ justifyContent: 'flex-end', display: 'flex', gap: '40px' }}>
                                    <div>
                                        <img src="/instagram.png" style={{ width: '30px' }} alt="imgg"></img>
                                    </div>
                                    <div>
                                        <img src="/fb.png" style={{ width: '30px' }} alt="imgg"></img>
                                    </div>
                                    <div>
                                        <img src="/twitterr.png" style={{ width: '30px' }} alt="imgg"></img>
                                    </div>
                                    <div>
                                        <img src="/mail2.png" style={{ width: '30px' }} alt="imgg"></img>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </div>
    );
}

export default UserDashboard;
