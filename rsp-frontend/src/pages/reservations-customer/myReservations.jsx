import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchUsers } from '../../api/userServiceApi';
import jwtDecode from 'jwt-decode';
import { getAuth } from '../../util/Utils';
import { fetchReservation, deleteReservation, fetchAllReservations } from '../../api/reservationCustomerApi';
import toast, { Toaster } from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import PaymentIcon from '@mui/icons-material/Payment';
import IconButton from '@mui/material/IconButton';
import EditMyReservation from '../../components/reservations/EditCustomerReservationDialog';

const MyReservations = () => {
    const loggedUserId = getAuth().id
    const [reservation, setReservation] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [user, setUser] = useState();
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() =>{
        function getUser() {
            fetchUsers(`?id=${loggedUserId}`)
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
    }, []);

    const handleGetReservations = () => {
        fetchAllReservations().then(res => {
            setReservations(res.data);
            console.log(res.data);
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

    // const handleGetReservations = () => {
    //     fetchReservation(userId).then(res => {
    //         setReservation(res.data);
    //         console.log(res.data);
    //     }).catch(() => {
    //         toast.error('Error!', {
    //             position: "top-right",
    //             style: {
    //               padding: '16px',
    //               color: 'white',
    //               background: '#FF0000'
    //             },
    //             iconTheme: {
    //               primary: 'red',
    //               secondary: '#FFFAEE',
    //             },
    //         });
    //     });
    // }

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

    const setEditingReservation = (payload) => {
        setReservation(payload);
        setEditOpen(true);
    }

  return (
    <div>
       <>
       <Toaster/>
       {/* {Object.keys(reservation).map(key => ( 
            <li>{reservation[key].hotelName}</li>      
        ))} */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:"700"}}>Hotel Name</TableCell>
                            <TableCell align="left" style={{fontWeight:"700"}}><b>Reservee Name</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Contact</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Email</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Check In Date</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Check Out Date</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Night Count</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Room Count</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Total Price(LKR)</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Adult Count</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Child Count</b></TableCell>
                            <TableCell align="center" style={{fontWeight:"700"}}><b>Status</b></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            reservations.map((reservation, index) => (
                                reservation.userId === loggedUserId && (
                                    <>
                                <TableRow key={index}>
                                    <TableCell align="left">{reservation.hotelName}</TableCell>
                                    <TableCell align="center">{reservation.reserveeName}</TableCell>
                                    <TableCell align="center">{reservation.contact}</TableCell>
                                    <TableCell align="center">{reservation.email}</TableCell>
                                    <TableCell align="center">{reservation.checkInDate.replace('T00:00:00.000Z','')}</TableCell>
                                    <TableCell align="center">{reservation.checkOutDate.replace('T00:00:00.000Z','')}</TableCell>
                                    <TableCell align="center">{reservation.nightCount}</TableCell>
                                    <TableCell align="center">{reservation.roomCount}</TableCell>
                                    <TableCell align="center">{reservation.totalPrice}.00</TableCell>
                                    <TableCell align="center">{reservation.adultCount}</TableCell>
                                    <TableCell align="center">{reservation.childCount}</TableCell>
                                    <TableCell align="center" style={{color:"red"}}>{reservation.status}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row" spacing={1}>
                                            <IconButton aria-label="delete" style={{color:"#FF0000"}} onClick={() => handleDeleteReservation(reservation.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton onClick={() => setEditingReservation(reservation)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton >
                                                <PaymentIcon onClick={() => window.location.href=`/payments/${reservation.id}`}/>
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                                </>
                                )
                             ))
                        } 
                    </TableBody>
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