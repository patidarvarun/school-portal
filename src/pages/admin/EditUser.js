/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import { Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, FormHelperText } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import { LoaderFile } from 'pages/extra-pages/LoaderFile';
import authHeader from 'pages/authentication/auth-forms/AuthHeader';
import { toast } from 'react-toastify';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

export default function CreateNewUser() {
    const [loading, setLoading] = useState(false);
    const [imagee, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const navigate = useNavigate();
    const { state } = useLocation();
    let editData = state?.EditDelete;
    const handleBack = () => {
        navigate('/admin/userList');
    };

    const handlOnChangeImage = (event) => {
        setImageURL(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    };

    return (
        <Box
            sx={{
                height: 'fit-content',
                backgroundColor: 'white'
            }}
        >
            <div style={{ padding: '10px', width: '100%', border: '1px solid' }}>
                <br />
                <h2 style={{ display: 'flex', position: 'absolute' }}>Edit User Details</h2>
                <div style={{ textAlign: 'right', marginRight: '17px', marginBottom: '10px' }}>
                    <Button onClick={handleBack} variant="contained" startIcon={<ArrowBackIcon />}>
                        Go Back
                    </Button>
                </div>
                <hr />
                <br />
                <br />
                <div className="cardd card-1" style={{ marginBottom: '35px' }}>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            image: '',
                            email: '',
                            contact: '',
                            status: ''
                        }}
                        onSubmit={async (values, { setErrors }) => {
                            let formData = new FormData();
                            const data = {
                                first_name: values.first_name === '' ? editData.first_name : values.first_name,
                                last_name: values.last_name === '' ? editData.last_name : values.last_name,
                                email: values.email === '' ? editData.email : values.email,
                                contact: values.contact === '' ? editData.contact : values.contact,
                                image: imagee === undefined ? editData.image : imagee
                                // status: values.status === '' ? editData.status : values.status
                            };
                            for (var key in data) {
                                formData.append(key, data[key]);
                            }
                            setLoading(true);
                            await axios
                                .put(`http://103.127.29.85:3001/api/UpdateUser/${editData.id}`, formData, {
                                    headers: authHeader()
                                })
                                .then((res) => {
                                    if (res?.status === 200) {
                                        toast.success('Data updated');
                                        window.location.replace('/admin/userList');
                                    } else {
                                        console.log('Something went wrong');
                                    }
                                })
                                .catch((err) => {
                                    toast.error(err.response.data.Message);
                                });
                            setLoading(false);
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="first_name">First Name</InputLabel>
                                            <OutlinedInput
                                                id="first_name"
                                                type="first_name"
                                                defaultValue={editData?.first_name}
                                                name="first_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="last_name">Last Name</InputLabel>
                                            <OutlinedInput
                                                id="last_name"
                                                type="last_name"
                                                defaultValue={editData?.last_name}
                                                name="last_name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter last_name"
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="image">Image</InputLabel>
                                            <div
                                                className="hoverimage"
                                                style={{ display: 'flex', border: '1px solid #d9d9d9', borderRadius: '5px' }}
                                            >
                                                {editData?.image === 'undefined' ? (
                                                    <img
                                                        src={imageURL === undefined ? '/default.png' : imageURL}
                                                        alt="imagee"
                                                        style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                                    />
                                                ) : imageURL === undefined ? (
                                                    <img
                                                        src={`http://103.127.29.85:3001/${editData?.image}`}
                                                        alt="imagee"
                                                        style={{ width: '64px', height: '64px' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={imageURL}
                                                        alt="imagee"
                                                        style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                                    />
                                                )}
                                                <input
                                                    id="image"
                                                    style={{ padding: '21px', width: '100%' }}
                                                    type="file"
                                                    name="image"
                                                    onBlur={handleBlur}
                                                    onChange={handlOnChangeImage}
                                                    fullWidth
                                                />
                                            </div>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                            <OutlinedInput
                                                id="email-login"
                                                type="email"
                                                defaultValue={editData?.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="contact">Contact</InputLabel>
                                            <OutlinedInput
                                                id="contact"
                                                type="tel"
                                                defaultValue={editData?.contact}
                                                name="contact"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter contact"
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="status">Status</InputLabel>
                                            <OutlinedInput
                                                id="status"
                                                type="status"
                                                defaultValue={editData?.status}
                                                name="status"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter status "
                                                fullWidth
                                            />
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Update
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </Box>
    );
}
