/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { LineAxisOutlined } from '../../../node_modules/@mui/icons-material/index';
import { LoaderFile } from 'pages/extra-pages/LoaderFile';

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    return (
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Create New Password</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                        })}
                        onSubmit={async (values, { setErrors }) => {
                            var requested = {
                                email: values.email
                            };
                            setLoading(true);
                            await axios
                                .post('http://103.127.29.85:3001/api/sendMail', requested)
                                .then((res) => {
                                    if (res?.status === 200) {
                                        toast.success('Link has been sent to your mail');
                                        localStorage.setItem('resetToken', res?.data?.resetToken);
                                        window.location.replace(res.data.PreviewURL);
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
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                            <OutlinedInput
                                                id="email-login"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
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
                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
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
                                                    Send Link
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
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};
export default ForgotPassword;
