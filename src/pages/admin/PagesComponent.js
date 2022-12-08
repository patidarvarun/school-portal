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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
export default function StickyHeadTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pageData, setPageData] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    async function handleDelete(data) {
        setLoading(true);
        await axios
            .delete(`http://103.127.29.85:3001/api/DeletePage/${data.id}`)
            .then((res) => {
                if (res?.status === 200) {
                    toast.success('User Deleted');
                    getPageContent();
                } else {
                    console.log('something went wrong');
                }
            })
            .catch((err) => {
                toast.error('Something went wrong');
            });
        setLoading(false);
    }
    async function getPageContent() {
        localStorage.removeItem('content');
        await axios
            .get(`http://103.127.29.85:3001/api/getContent`)
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
                            <TableCell style={{ background: '#efefef', color: 'black' }}>&emsp;Action</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>&emsp;Edit</TableCell>
                            <TableCell style={{ background: '#efefef', color: 'black' }}>Delete</TableCell>
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
                                <TableCell style={{ cursor: 'pointer' }}>
                                    <Button
                                        // onClick={() => handleEdit(row)}
                                        variant="contained"
                                        style={{ fontSize: 'inherit', fontWeight: ' 600' }}
                                        size="small"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell style={{ cursor: 'pointer' }}>
                                    <Button
                                        onClick={() => handleDelete(row)}
                                        variant="contained"
                                        style={{ fontSize: 'inherit', fontWeight: ' 600' }}
                                        size="small"
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
