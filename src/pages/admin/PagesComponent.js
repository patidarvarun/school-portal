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
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MenuItem, Box, Popover, FormControl, IconButton, Select, Modal, InputBase, styled, Divider } from '@mui/material';
import authHeader from '../authentication/auth-forms/AuthHeader';

export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageData, setPageData] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [EditDelete, setEditDelete] = useState();

    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
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
    const handleDelete = async () => {
        setLoading(true);
        setOpen(false);
        await axios
            .delete(`http://103.127.29.85:3001/api/DeletePage/${EditDelete.id}`, {
                headers: authHeader()
            })
            .then((res) => {
                if (res?.status === 200) {
                    toast.success('Page Deleted');
                    getPageContent();
                } else {
                    console.log('something went wrong');
                }
            })
            .catch((err) => {
                toast.error('Something went wrong');
            });
        setLoading(false);
    };
    async function getPageContent() {
        localStorage.removeItem('content');
        await axios
            .get(`http://103.127.29.85:3001/api/getContent`, {
                headers: authHeader()
            })
            .then((res) => {
                setPageData(res.data);
            })
            .catch((err) => {
                toast.error('Something went wrong');
            });
    }
    useEffect(() => {
        getPageContent();
    }, []);

    const handleView = (data) => {
        localStorage.removeItem('content');
        localStorage.setItem('content', data.html);
        var win = window.open('/viewPageContent', '_blank');
        win.focus();
    };
    const handleOpenMenu = (event, data) => {
        setOpen(event.currentTarget);
        setEditDelete(data);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handlePageChange = () => {
        navigate('/admin/createNewPage');
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
                        Create New Page
                    </Button>
                </div>
                <hr />
                <Table sx={{ minWidth: 150 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Id</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Name</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Author</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Status</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>&nbsp; Content</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pageData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.author}</TableCell>
                                <TableCell>{row.status}</TableCell>

                                <TableCell style={{ cursor: 'pointer' }}>
                                    <Button
                                        onClick={() => handleView(row)}
                                        variant="text"
                                        style={{ fontSize: 'inherit', fontWeight: ' 400' }}
                                        size="small"
                                    >
                                        View
                                    </Button>
                                </TableCell>
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
                    <MenuItem
                    //onClick={() => handleEdit(row)}
                    >
                        <EditIcon sx={{ mr: 2 }} />
                        Edit
                    </MenuItem>
                    <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
                        <DeleteOutlineIcon sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={pageData?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </>
    );
}
