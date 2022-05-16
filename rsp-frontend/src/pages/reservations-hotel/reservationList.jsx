import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import EditReservation from "../../components/reservations/EditHotelReservationDialog";
import { deleteReservation, getAllReservations } from "../../api/reservatiosHotelApi";
import CreateHotelReservation from "../../components/reservations/CreateHotelReservationDialog";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';
import TablePagination from '@mui/material/TablePagination';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    handleGetReservations();
  }, []);

  const handleGetReservations = () => {
    getAllReservations().then(res => {
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

  const setEditingReservation = (payload) => {
    setReservation(payload);
    setEditOpen(true);
  }

  const setAddReservation = (payload) => {
    // setReservation(payload);
    setAddOpen(true);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <>
    <Toaster/>
    <h1>Manage Reservations</h1>
    <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setAddReservation(reservation)} style={{float:"right"}}>Create</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>ID</TableCell> */}
              <TableCell align="left">Hotel Name</TableCell>
              <TableCell align="center">Ratings</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Room Price(LKR)</TableCell>
              {/* <TableCell align="center">Service Price</TableCell>
              <TableCell align="center">Tax</TableCell> */}
              <TableCell align="center">Available Rooms</TableCell>
              <TableCell align="center">Status</TableCell>
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
                <TableCell align="center">{reservation.hotelRatings}</TableCell>
                <TableCell align="center">{reservation.hotelAddress}</TableCell>
                <TableCell align="center">{reservation.hotelContact}</TableCell>
                <TableCell align="center">{reservation.description}</TableCell>
                <TableCell align="center">5000.00</TableCell>
                <TableCell align="center">{reservation.availableRooms}</TableCell>
                <TableCell align="center">{reservation.isHotelAvailable}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton aria-label="fingerprint" style={{color:"black"}} onClick={() => setEditingReservation(reservation)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="fingerprint" style={{color:"#FF0000"}} onClick={() => handleDeleteReservation(reservation.id)}>
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
      {addOpen && (
            <CreateHotelReservation
            setAddOpen={setAddOpen}
            />
        )
      }
      {editOpen && reservation &&
        <EditReservation
          reservation={reservation}
          setEditOpen={setEditOpen}
          handleGetReservations={handleGetReservations}
        />
      }
    </>
  )
}

export default Reservations;