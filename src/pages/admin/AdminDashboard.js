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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton, InputLabel, OutlinedInput, Stack, MenuItem, Popover } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [userData, setUserData] = useState();
    const [open, setOpen] = useState(false);
    const [openn, setOpenn] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [EditDelete, setEditDelete] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpenn(false);
        setOpen(null);
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
    const handleOpen = () => {
        setOpenn(true);
    };
    const handleEdit = () => {
        navigate(`/admin/editUser?id=${EditDelete.id}`, { state: { EditDelete } });
    };
    const handleOpenMenu = (event, data) => {
        setOpen(event.currentTarget);
        setEditDelete(data);
    };
    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handleDelete = async () => {
        handleOpen();
    };

    const handleDeletee = async () => {
        setLoading(true);
        setOpen(false);
        EditDelete?.name === 'admin'
            ? toast.error('Admin can not deleted!!')
            : await axios
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
        setOpenn(false);
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
                <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>FirstName</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>LastName</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Image</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Email</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Contact</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Role</TableCell>
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
                                        <img
                                            src="/default.png"
                                            alt="imagee"
                                            style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                        />
                                    ) : (
                                        <img
                                            src={`http://103.127.29.85:3001/${row.image}`}
                                            alt="imagee"
                                            style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.contact}</TableCell>
                                <TableCell>
                                    {row.name === 'user' ? (
                                        <span className="namecolortext">{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</span>
                                    ) : (
                                        <span className="namecolortext1">{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</span>
                                    )}
                                </TableCell>
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
                <Modal open={openn} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <div style={{ borderBottom: '1px solid lightsteelblue' }}>
                            <h3 className="h3-heading">Are you want to delete?</h3>
                        </div>
                        <div className="btn-div">
                            <button className="btnn-no" onClick={handleClose}>
                                No
                            </button>
                            &emsp;&nbsp;
                            <button className="btnn-yees" onClick={handleDeletee}>
                                Yes
                            </button>
                        </div>
                    </Box>
                </Modal>
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
