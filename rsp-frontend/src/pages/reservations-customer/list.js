import * as React from 'react';
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
import Grid from '@mui/material/Grid';
import EditReservation from "../../components/reservations/EditHotelReservationDialog";
import { deleteReservation, getAllReservations } from "../../api/reservatiosHotelApi";
import CreateHotelReservation from "../../components/reservations/CreateHotelReservationDialog";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MakeReservation from '../../components/reservations/makeCustomerReservationDialog';

const ListOfReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

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

  const setEditingReservation = (payload) => {
    setReservation(payload);
    setEditOpen(true);
  }

  const setAddReservation = (payload) => {
    // setReservation(payload);
    setAddOpen(true);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Toaster/>
    <h1>Available Reservations</h1>
    <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setAddReservation(reservation)} style={{float:"right"}}>Create</Button>
        <center>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {reservations && reservations.map((reservation, index) => (
            <>
            {reservation.isHotelAvailable === "Available" && (
            <Grid item xs={2} sm={4} md={3} key={index}>
            <Card sx={{ maxWidth: 345 }} key={index} style={{background:"white",boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}}>
                <CardHeader
                    title={<span><b>{reservation.hotelName}</b></span>}
                    subheader={<span>Rating - {reservation.hotelRatings}</span>}
                />
                <hr/>
                <CardMedia
                    component="img"
                    height="194"
                    image={reservation.hotelImage}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location - {reservation.hotelAddress}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Contact - {reservation.hotelContact}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Prices Starting from - LKR. {reservation.roomPrice}.00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Available Rooms {reservation.availableRooms}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing style={{float:"right"}}>
                    <Tooltip title="Reserve Now">
                        <IconButton onClick={() => setEditingReservation(reservation)}>
                            <AddTaskIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
                </Card>
            </Grid>
            )}
            </>
            ))}
        </Grid>
        </center>
      {addOpen && (
            <CreateHotelReservation
            setAddOpen={setAddOpen}
            />
        )
      }
      {editOpen && reservation &&
        <MakeReservation
          reservation={reservation}
          setEditOpen={setEditOpen}
          handleGetReservations={handleGetReservations}
        />
      }
    </>
  )
}

export default ListOfReservations;