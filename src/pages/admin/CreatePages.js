/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Grid, InputLabel, OutlinedInput, Stack, FormHelperText, Select } from '@mui/material';
import { LoaderFile } from 'pages/extra-pages/LoaderFile';
import authHeader from 'pages/authentication/auth-forms/AuthHeader';
import { toast } from 'react-toastify';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const CreatePages = (props) => {
    const emailEditorRef = useRef(null);
    const [statuss, setStatuss] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange1 = (event) => {
        if (event.target.value === '') {
            setErrorStatus('Status is required');
        } else {
            setErrorStatus('');
            setStatuss(event.target.value);
        }
    };
    const exportHtml = () => {
        if (statuss === '') {
            setErrorStatus('Status is required');
        } else {
            setErrorStatus('');
        }
    };
    const handleBack = () => {
        navigate('/admin/pages');
    };
    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    };

    const onReady = () => {
        console.log('onReady');
    };
    return (
        <div>
            <div>
                <Formik
                    initialValues={{
                        name: '',
                        slug: '',
                        status: ''
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
                        slug: Yup.string().required('Slug is required')
                    })}
                    onSubmit={async (values, { setErrors }) => {
                        emailEditorRef.current.editor.exportHtml(async (data) => {
                            const { design, html } = data;
                            if (design?.body?.rows[0]?.columns[0]?.contents?.length === 0) {
                                toast.error('Please provide content');
                            } else {
                                let formData = new FormData();
                                const req = {
                                    name: values.name,
                                    author: 'admin',
                                    slug: values.slug,
                                    description: 'OK okok okk',
                                    status: statuss,
                                    html: html
                                };
                                for (var key in req) {
                                    formData.append(key, req[key]);
                                }
                                setLoading(true);
                                await axios
                                    .post(`http://103.127.29.85:3001/api/createContent`, formData, {
                                        headers: authHeader()
                                    })
                                    .then((res) => {
                                        if (res?.status === 200) {
                                            toast.success('Page create successfully');
                                            setTimeout(() => {
                                                window.location.replace('/admin/pages');
                                            }, 1000);
                                        } else {
                                            console.log('something went wrong');
                                        }
                                    })
                                    .catch((err) => {
                                        toast.error('Something went wrong');
                                    });
                                setLoading(false);
                            }
                        });
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3.5}>
                                <Grid item xs={3.2}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="name">Name*</InputLabel>
                                        <OutlinedInput
                                            id="name"
                                            type="name"
                                            name="name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            fullWidth
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-name-login">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={3.2}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="status">Status*</InputLabel>
                                        <Select
                                            id="status"
                                            name="status"
                                            value={statuss}
                                            onChange={handleChange1}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value="">
                                                <em></em>
                                            </MenuItem>
                                            <MenuItem value="published">Published</MenuItem>
                                            <MenuItem value="unPublished">Unpublished</MenuItem>
                                        </Select>

                                        <FormHelperText error id="standard-weight-helper-text-status-login">
                                            {errorStatus ? errorStatus : ''}
                                        </FormHelperText>
                                    </Stack>
                                </Grid>
                                <Grid item xs={3.2}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="slug">Slug*</InputLabel>
                                        <OutlinedInput
                                            id="slug"
                                            type="slug"
                                            name="slug"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter your slug"
                                            fullWidth
                                            error={Boolean(touched.slug && errors.slug)}
                                        />
                                        {touched.slug && errors.slug && (
                                            <FormHelperText error id="standard-weight-helper-text-slug-login">
                                                {errors.slug}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={1.3}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="">.</InputLabel>
                                        {!loading ? (
                                            <Button
                                                variant="contained"
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                color="primary"
                                                onClick={exportHtml}
                                                endIcon={<CheckCircleOutlineIcon />}
                                            >
                                                Save
                                            </Button>
                                        ) : (
                                            <LoaderFile />
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={1}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="">.</InputLabel>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            size="large"
                                            color="primary"
                                            onClick={handleBack}
                                            startIcon={<ArrowBackIosIcon />}
                                        >
                                            Back
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>

            <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
        </div>
    );
};
export default CreatePages;
