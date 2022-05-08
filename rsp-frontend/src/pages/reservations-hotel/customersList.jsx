import { useEffect, useState } from "react"
import { handleError } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import EditReservation from "../../components/reservations/EditHotelReservationDialog";
import CreateHotelReservation from "../../components/reservations/CreateHotelReservationDialog";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';
import { fetchAllReservations, deleteReservation } from "../../api/reservationCustomerApi";

const CustomerReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

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

  return (
    <>
    <Toaster/>
    <h1>All Reservations By Customers</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell align="left">Hotel Name</TableCell>
              <TableCell align="center">reserveeName</TableCell>
              <TableCell align="center">contact</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">checkInDate</TableCell>
              <TableCell align="center">checkOutDate</TableCell>
              <TableCell align="center">nightCount</TableCell>
              <TableCell align="center">roomCount</TableCell>
              <TableCell align="center">totalPrice</TableCell>
              <TableCell align="center">adultCount</TableCell>
              <TableCell align="center">childCount</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations && reservations.map((reservation, index) => (
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
                <TableCell align="right">{reservation.adultCount}</TableCell>
                <TableCell align="center">{reservation.childCount}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton aria-label="fingerprint" style={{color:"#FF0000"}} onClick={() => handleDeleteReservation(reservation.id)}>
                        <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CustomerReservationsList;