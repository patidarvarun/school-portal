/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AuthWrapper from './AuthWrapper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LoaderFile } from 'pages/extra-pages/LoaderFile';

const CreatePassword = () => {
    const navigate = useNavigate();
    let resetToken = localStorage.getItem('resetToken');
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirm_password, setshowconfirm_password] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowconfirm_password = () => {
        setshowconfirm_password(!showconfirm_password);
    };
    const handleMouseDownconfirm_password = (event) => {
        event.preventDefault();
    };
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
                            password: '',
                            confirm_password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string()
                                .required('Password is required.')
                                .min(8, 'Password is too short - should be 8 chars minimum.')
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
                                ),
                            confirm_password: Yup.string()
                                .required('confirm_password is required.')
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        })}
                        onSubmit={async (values, { setErrors }) => {
                            var requested = {
                                password: values.password,
                                confirm_password: values.confirm_password,
                                token: resetToken
                            };
                            setLoading(true);
                            await axios
                                .post('http://103.127.29.85:3001/api/forgetPassword', requested)
                                .then((res) => {
                                    if (res?.status === 200) {
                                        toast.success('Password is successfull Created');
                                        localStorage.clear('resetToken');
                                        navigate('/login');
                                        // setTimeout(() => {
                                        // }, 1000);
                                    } else {
                                        console.log('something went wrong');
                                    }
                                })
                                .catch((error) => {
                                    console.log('error.message', error);
                                });
                            setLoading(false);
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Enter password"
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="standard-weight-helper-text-password">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="confirm_password">Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="-confirm_password"
                                                type={showconfirm_password ? 'text' : 'password'}
                                                value={values.confirm_password}
                                                name="confirm_password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle confirm_password visibility"
                                                            onClick={handleClickShowconfirm_password}
                                                            onMouseDown={handleMouseDownconfirm_password}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showconfirm_password ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Enter password"
                                            />
                                            {touched.confirm_password && errors.confirm_password && (
                                                <FormHelperText error id="standard-weight-helper-text-confirm_password-login">
                                                    {errors.confirm_password}
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
                                                    Create Password
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
export default CreatePassword;
