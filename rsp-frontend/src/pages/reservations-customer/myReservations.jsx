import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchUsers } from '../../api/userServiceApi';
import jwtDecode from 'jwt-decode';
import { fetchReservation, deleteReservation } from '../../api/reservationCustomerApi';
import toast, { Toaster } from 'react-hot-toast';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import EditMyReservation from '../../components/reservations/EditCustomerReservationDialog';

const MyReservations = () => {
    const userId = jwtDecode(localStorage.getItem('authentication')).id;
    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState({});
    const [user, setUser] = useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() =>{
        function getUser(){
            fetchUsers(`?id=${userId}`)
            .then((res) =>{
                setUser(res.data);
                console.log(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getUser();
    }, []);

    useEffect(() => {
        handleGetReservations();
      }, [userId]);

      const handleGetReservations = () => {
        fetchReservation(userId).then(res => {
            setReservations(res.data);
            console.log(res.data)
        }).catch(() => {
            toast.error('Error!', {
                position: "top-right",
                style: {
                  padding: '16px',
                  color: 'white',
                  background: '#FF0000'
                },
                iconTheme: {
                  primary: 'red',
                  secondary: '#FFFAEE',
                },
            });
        });
      }

      const handleDeleteReservation = (id) => {
        deleteReservation(id)
            .then((res) => {
                handleGetReservations();
                toast.success('Deleted Successfully!', {
                    position: "top-right",
                    style: {
                      border: '1px solid #713200',
                      padding: '16px',
                      color: 'white',
                      background: '#4BB543'
                    },
                    iconTheme: {
                      primary: 'green',
                      secondary: '#FFFAEE',
                    },
                });
            })
            .catch(() => {
                toast.error('Error!', {
                    position: "top-right",
                    style: {
                      padding: '16px',
                      color: 'white',
                      background: '#FF0000'
                    },
                    iconTheme: {
                      primary: 'red',
                      secondary: '#FFFAEE',
                    },
                });
            })
      }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
      
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const setEditingReservation = (payload) => {
        setReservation(payload);
        setEditOpen(true);
    }

  return (
    <div>
       <>
       <Toaster/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"700"}}>Hotel Name</TableCell>
                            <TableCell align="left" style={{fontWeight:"700"}}>Reservee Name</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Contact</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Email</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Check In Date</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Check Out Date</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Night Count</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Room Count</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Total Price</TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}>Adult Count</TableCell>
                            <TableCell align="right" style={{fontWeight:"700"}}>Child Count</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">{reservation.hotelName}</TableCell>
                                    <TableCell align="center">{reservation.reserveeName}</TableCell>
                                    <TableCell align="center">{reservation.contact}</TableCell>
                                    <TableCell align="center">{reservation.email}</TableCell>
                                    <TableCell align="center">{reservation.checkInDate}</TableCell>
                                    <TableCell align="center">{reservation.checkOutDate}</TableCell>
                                    <TableCell align="center">{reservation.nightCount}</TableCell>
                                    <TableCell align="center">{reservation.roomCount}</TableCell>
                                    <TableCell align="center">{reservation.totalPrice}</TableCell>
                                    <TableCell align="center">{reservation.adultCount}</TableCell>
                                    <TableCell align="center">{reservation.childCount}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1}>
                                            <IconButton aria-label="delete" style={{color:"#FF0000"}} onClick={() => handleDeleteReservation(reservation.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => setEditingReservation(reservation)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableRow>
                        <TablePagination
                           rowsPerPageOptions={[5, 10, 15]}
                           count={reservations.length}
                           page={page}
                           onPageChange={handleChangePage}
                           rowsPerPage={rowsPerPage}
                           onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </Table>
            </TableContainer>
       </>
       {editOpen && reservation &&
        <EditMyReservation
          reservation={reservation}
          setEditOpen={setEditOpen}
          handleGetReservations={handleGetReservations}
        />
      }
    </div>
  )
}

export default MyReservations;