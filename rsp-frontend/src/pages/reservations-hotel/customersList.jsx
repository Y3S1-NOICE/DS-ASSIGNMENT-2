import React, { useEffect, useState } from 'react'
import { handleError } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';
import { fetchAllReservations, deleteReservation } from "../../api/reservationCustomerApi";
import EditStatus from './editStatus';

const CustomerReservationsList = () => {
  const [reservation, setReservation] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    handleGetReservations();
  }, []);

  const handleGetReservations = () => {
    fetchAllReservations().then(res => {
        setReservations(res.data);
        // console.log(res.data)
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

  const setEditingStatus = (payload) => {
    setReservation(payload);
    setEditOpen(true);
  }

  return (
    <>
    <Toaster/>
    <h1>All Reservations By Customers</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell align="left"><b>Hotel Name</b></TableCell>
              <TableCell align="center"><b>Reservee Name</b></TableCell>
              <TableCell align="center"><b>Contact</b></TableCell>
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Check In Date</b></TableCell>
              <TableCell align="center"><b>Check Out Date</b></TableCell>
              <TableCell align="center"><b>Night Count</b></TableCell>
              <TableCell align="center"><b>Room Count</b></TableCell>
              <TableCell align="center"><b>Total Price(LKR)</b></TableCell>
              <TableCell align="center"><b>Adult Count</b></TableCell>
              <TableCell align="center"><b>Child Count</b></TableCell>
              <TableCell align="center"><b>Status</b></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reservation, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">{reservation.id}</TableCell> */}
                <TableCell component="th" scope="row" align="left">{reservation.hotelName}</TableCell>
                <TableCell align="center">{reservation.reserveeName}</TableCell>
                <TableCell align="center">{reservation.contact}</TableCell>
                <TableCell align="center">{reservation.email}</TableCell>
                <TableCell align="center">{reservation.checkInDate}</TableCell>
                <TableCell align="center">{reservation.checkOutDate}</TableCell>
                <TableCell align="center">{reservation.nightCount}</TableCell>
                <TableCell align="center">{reservation.roomCount}</TableCell>
                <TableCell align="center">{reservation.totalPrice}.00</TableCell>
                <TableCell align="center">{reservation.adultCount}</TableCell>
                <TableCell align="center">{reservation.childCount}</TableCell>
                <TableCell align="center" style={{color:"red"}}>{reservation.status}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => setEditingStatus(reservation)}>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton aria-label="delete" style={{color:"#FF0000"}} onClick={() => handleDeleteReservation(reservation.id)}>
                        <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
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
      {editOpen && reservation &&
          <EditStatus
            reservation={reservation}
            setEditOpen={setEditOpen}
            handleGetReservations={handleGetReservations}
          />
      }
    </>
  )
}

export default CustomerReservationsList;