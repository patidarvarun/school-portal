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

export default function CreateNewUser() {
    const [loading, setLoading] = useState(false);
    const [imagee, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/admin/dashboard');
    };

    const handlOnChangeImage = (event) => {
        setImageURL(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    };
    return (
        <Box
            sx={{
                // width: '100%',
                height: 'fit-content',
                backgroundColor: 'white'
                // '&:hover': {
                //     backgroundColor: 'white',
                //     opacity: [0.9, 0.8, 0.7]
                // }
            }}
        >
            <div style={{ padding: '10px', width: '100%', border: '1px solid' }}>
                <br />
                <h2 style={{ display: 'flex', position: 'absolute' }}>Fill User Details</h2>
                <div style={{ textAlign: 'right', marginRight: '17px', marginBottom: '10px' }}>
                    <Button onClick={handleBack} variant="contained" startIcon={<ArrowBackIcon />}>
                        Go Back
                    </Button>
                </div>
                <hr />
                <br />
                <br />

                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        image: '',
                        email: '',
                        description: '',
                        contact: '',
                        status: ''
                    }}
                    validationSchema={Yup.object().shape({
                        first_name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('First name is required'),
                        last_name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Last name is required'),
                        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                        description: Yup.string()
                            .min(10, 'Too short description!')
                            .max(100, 'Too Long!')
                            .required('Description is required'),
                        contact: Yup.string()
                            .required('Contact number is Required')
                            .matches(
                                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                                'Contact number is not valid'
                            )
                    })}
                    onSubmit={async (values, { setErrors }) => {
                        let formData = new FormData();
                        const data = {
                            first_name: values.first_name,
                            last_name: values.last_name,
                            image: imagee,
                            email: values.email,
                            description: values.description,
                            contact: values.contact,
                            role_id: '1'
                        };
                        for (var key in data) {
                            formData.append(key, data[key]);
                        }
                        setLoading(true);
                        await axios
                            .post(`http://103.127.29.85:3001/api/createUser`, formData, {
                                headers: authHeader()
                            })
                            .then((res) => {
                                if (res?.status === 200) {
                                    toast.success('New user created');
                                    setTimeout(() => {
                                        window.location.replace('/admin/dashboard');
                                    }, 1000);
                                } else {
                                    console.log('something went wrong');
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
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="first_name">First Name*</InputLabel>
                                        <OutlinedInput
                                            id="first_name"
                                            type="first_name"
                                            // defaultValue={editData?.first_name}
                                            name="first_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter your first_name"
                                            fullWidth
                                            error={Boolean(touched.first_name && errors.first_name)}
                                        />
                                        {touched.first_name && errors.first_name && (
                                            <FormHelperText error id="standard-weight-helper-text-first_name-login">
                                                {errors.first_name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="last_name">Last Name*</InputLabel>
                                        <OutlinedInput
                                            id="last_name"
                                            type="last_name"
                                            // defaultValue={editData?.last_name}
                                            name="last_name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter your last_name"
                                            fullWidth
                                            error={Boolean(touched.last_name && errors.last_name)}
                                        />
                                        {touched.last_name && errors.last_name && (
                                            <FormHelperText error id="standard-weight-helper-text-last_name-login">
                                                {errors.last_name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="image">Image</InputLabel>
                                        <div
                                            className="hoverimage"
                                            style={{ display: 'flex', border: '1px solid #d9d9d9', borderRadius: '5px' }}
                                        >
                                            {imageURL === undefined ? (
                                                ''
                                            ) : (
                                                <img src={imageURL} alt="imagee" style={{ width: '64px', height: '64px' }} />
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
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Email Address*</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            // defaultValue={editData?.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="description">Description*</InputLabel>
                                        <OutlinedInput
                                            id="description"
                                            type="description"
                                            // defaultValue={editData?.description}
                                            name="description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter description "
                                            fullWidth
                                            error={Boolean(touched.description && errors.description)}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error id="standard-weight-helper-text-description-login">
                                                {errors.description}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="contact">Contact*</InputLabel>
                                        <OutlinedInput
                                            id="contact"
                                            type="tel"
                                            // defaultValue={editData?.contact}
                                            name="contact"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter your contact number"
                                            fullWidth
                                            error={Boolean(touched.contact && errors.contact)}
                                        />
                                        {touched.contact && errors.contact && (
                                            <FormHelperText error id="standard-weight-helper-text-contact-login">
                                                {errors.contact}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <AnimateButton>
                                        {!loading ? (
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Submit
                                            </Button>
                                        ) : (
                                            <LoaderFile />
                                        )}
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
        </Box>
    );
}
