/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import authHeader from '../authentication/auth-forms/AuthHeader';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { Grid, IconButton, InputLabel, OutlinedInput, Stack, MenuItem, Popover } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userData, setUserData] = useState();
    const [open, setOpen] = useState(false);
    const [openn, setOpenn] = useState(false);
    const [imagee, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const [scroll, setScroll] = useState('paper');
    const [editData, setEditData] = useState();
    const [EditDelete, setEditDelete] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleClickOpen(scrollType) {
        setOpenn(true);
        setScroll(scrollType);
    }

    const handleClose = () => {
        setOpenn(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handlOnChangeImage = (event) => {
        setImageURL(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    };
    const handleEdit = () => {
        handleClickOpen('paper');
        setEditData(EditDelete);
    };
    const handleOpenMenu = (event, data) => {
        setOpen(event.currentTarget);
        setEditDelete(data);
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handleDelete = async () => {
        setLoading(true);
        setOpen(false);
        await axios
            .delete(`http://103.127.29.85:3001/api/DeleteUser/${EditDelete.id}`, {
                headers: authHeader()
            })
            .then((res) => {
                if (res?.status === 200) {
                    toast.success('User Deleted');
                    getUserData();
                } else {
                    console.log('something went wrong');
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Message);
            });
        setLoading(false);
    };
    async function getUserData() {
        await axios
            .get(`http://103.127.29.85:3001/api/user`, {
                headers: authHeader()
            })
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    }
    useEffect(() => {
        getUserData();
    }, []);

    const handlePageChange = () => {
        navigate('/admin/createUser');
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <br />
                <div style={{ textAlign: 'right', marginRight: '17px', marginBottom: '10px' }}>
                    <Button onClick={handlePageChange} variant="contained" startIcon={<AddCircleOutlineIcon />}>
                        Add New User
                    </Button>
                </div>
                <hr />
                <div>
                    <Dialog
                        open={openn}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogTitle id="scroll-dialog-title">Edit Form</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
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
                                onSubmit={async (values, { setErrors }) => {
                                    let formData = new FormData();
                                    const data = {
                                        first_name: values.first_name === '' ? editData.first_name : values.first_name,
                                        last_name: values.last_name === '' ? editData.last_name : values.last_name,
                                        email: values.email === '' ? editData.email : values.email,
                                        description: values.description === '' ? editData.description : values.description,
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
                                                window.location.replace('/admin/dashboard');
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
                                                                style={{ width: '64px', height: '64px' }}
                                                            />
                                                        ) : imageURL === undefined ? (
                                                            <img
                                                                src={`http://103.127.29.85:3001/${editData?.image}`}
                                                                alt="imagee"
                                                                style={{ width: '64px', height: '64px' }}
                                                            />
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
                                                    <InputLabel htmlFor="description">Description</InputLabel>
                                                    <OutlinedInput
                                                        id="description"
                                                        type="description"
                                                        defaultValue={editData?.description}
                                                        name="description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter description "
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>FirstName</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>LastName</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Image</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Email</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Description</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Contact</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Status</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>&emsp;Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.first_name}
                                </TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>
                                    {row.image === 'undefined' ? (
                                        <img src="/default.png" alt="imagee" style={{ width: '64px', height: '64px' }} />
                                    ) : (
                                        <img
                                            src={`http://103.127.29.85:3001/${row.image}`}
                                            alt="imagee"
                                            style={{ width: '64px', height: '64px' }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.contact}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, row)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx: {
                            p: 1,
                            width: 140,
                            '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75
                            }
                        }
                    }}
                >
                    <MenuItem onClick={handleEdit}>
                        <EditIcon sx={{ mr: 2 }} />
                        Edit
                    </MenuItem>
                    <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
                        <DeleteOutlineIcon sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={userData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
}
