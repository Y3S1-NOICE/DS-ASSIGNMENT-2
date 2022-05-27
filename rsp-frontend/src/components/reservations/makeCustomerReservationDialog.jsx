import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import { makeReservation } from '../../api/reservationCustomerApi';
import { fetchUsers } from '../../api/userServiceApi';
import { getAuth } from '../../util/Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MakeReservation = (props) =>{
    const loggedUserId = getAuth().id;
    const [reservation, setReservation] = useState(props.reservation);
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState({
        hotelName: '',
        reserveeName: '',
        contact: '',
        checkInDate: '',
        checkOutDate: '',
        nightCount: '',
        roomCount: '',
        init: true
    });

    const validateReservation = () => {
        let hotelName = '';
        let reserveeName = '';
        let contact = '';
        let checkInDate = '';
        let checkOutDate = '';
        let nightCount = '';
        let roomCount = '';

        !reservation.hotelName && (hotelName = 'Required. Hotel name cannot be empty.');
        !reservation.reserveeName && (reserveeName = 'Required. Name cannot be empty.');
        !reservation.checkInDate && (checkInDate = 'Required. Check-In-Date cannot be empty.');
        !reservation.checkOutDate && (checkOutDate = 'Required. Check-Out-Date rooms cannot be empty.');
        !reservation.nightCount && (nightCount = 'Required. Night Count cannot be empty.');
        !reservation.roomCount && (roomCount = 'Required. Room Count cannot be empty.');
        reservation.contact && reservation.contact.length > 0 && reservation.contact.length != 10 && (contact = 'Required. Phone number must contain 10 digits.');

        setErrors({...errors, hotelName, reserveeName, checkInDate, checkOutDate, nightCount, roomCount, contact, init: false});
    }

    useEffect(() =>{
        function getUser(){
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

    const handleSubmit = () => {
        const resObj = {
            userId: loggedUserId,
            hotelName: reservation.hotelName,
            reserveeName: reservation.reserveeName,
            contact: reservation.contact,
            email: reservation.email,
            checkInDate: reservation.checkInDate,
            checkOutDate: reservation.checkOutDate,
            nightCount: reservation.nightCount,
            roomCount: reservation.roomCount,
            adultCount: reservation.adultCount,
            childCount: reservation.childCount,
        }
        validateReservation();
        if(errors.hotelName === '' && errors.reserveeName === '' && errors.checkInDate === '' && errors.checkOutDate === '' && errors.nightCount === '' &&  errors.roomCount === '' && errors.contact === '' && !errors.init) {
        makeReservation(resObj)
            .then((res) => {
                console.log(res.data)
                props.handleGetReservations();
                toast.success('Successfully Updated!', {
                    position: "top-right",
                    style: {
                      padding: '16px',
                      color: 'white',
                      background: '#4BB543'
                    },
                    iconTheme: {
                      primary: 'green',
                      secondary: '#FFFAEE',
                    },
                });
                window.location.reload('/users/reservations');
                //props.setEditOpen(false);
            })
            .catch((e) => {
                console.log(e);
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
        } else {
                toast.info('Please input valid details.', {
                    position: "top-right",
                    style: {
                      padding: '16px',
                      color: 'white',
                      background: 'blue'
                    },
                    iconTheme: {
                      primary: 'blue',
                      secondary: 'white',
                    },
                });
            }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'userId': {
                setReservation({...reservation, userId: value});
                break;
            }
            case 'hotelName': {
                setErrors({ ...errors, hotelName: '' })
                setReservation({...reservation, hotelName: value});
                break;
            }
            case 'reserveeName': {
                setErrors({ ...errors, reserveeName: '' })
                setReservation({...reservation, reserveeName: value});
                break;
            }
            case 'contact': {
                setErrors({ ...errors, contact: '' })
                setReservation({...reservation, contact: value});
                break;
            }
            case 'email': {
                setReservation({...reservation, email: value});
                break;
            }
            case 'checkInDate': {
                setErrors({ ...errors, checkInDate: '' })
                setReservation({...reservation, checkInDate: value});
                break;
            }
            case 'checkOutDate': {
                setErrors({ ...errors, checkOutDate: '' })
                setReservation({...reservation, checkOutDate: value});
                break;
            }
            case 'nightCount': {
                setErrors({ ...errors, nightCount: '' })
                setReservation({...reservation, nightCount: value});
                break;
            }
            case 'roomCount': {
                setErrors({ ...errors, roomCount: '' })
                setReservation({...reservation, roomCount: value});
                break;
            }
            case 'adultCount': {
                setReservation({...reservation, adultCount: value});
                break;
            }
            case 'childCount': {
                setReservation({...reservation, childCount: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Toaster/>
        <Dialog 
            open={true} 
            onClose={() => props.setEditOpen(false)}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>Make Reservation</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="hotelName"
                            label="Hotel Name"
                            type="text"
                            value={reservation.hotelName || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            disabled={true}
                            error={errors.hotelName !== ''}
                            helperText={errors.hotelName}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="reserveeName"
                            label="Reservee Name"
                            type="text"
                            value={reservation.reserveeName || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                            required
                            error={errors.reserveeName !== ''}
                            helperText={errors.reserveeName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="userId"
                            label="User Id"
                            type="text"
                            value={loggedUserId}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            disabled={true}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            label="Email"
                            type="text"
                            value={reservation.email || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="checkInDate"
                            label="Check In Date"
                            type="date"
                            value={reservation.checkInDate || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                            error={errors.checkInDate !== ''}
                            helperText={errors.checkInDate}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="checkOutDate"
                            label="Check Out Date"
                            type="date"
                            value={reservation.checkOutDate || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                            error={errors.checkOutDate !== ''}
                            helperText={errors.checkOutDate}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="nightCount"
                            label="Night Count"
                            type="number"
                            value={reservation.nightCount || 0}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                            error={errors.nightCount !== ''}
                            helperText={errors.nightCount}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="roomCount"
                            label="Room Count"
                            type="number"
                            value={reservation.roomCount || 0}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                            error={errors.roomCount !== ''}
                            helperText={errors.roomCount}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="contact"
                            label="Contact Number"
                            type="text"
                            value={reservation.contact || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ required: true }}
                            error={errors.contact !== ''}
                            helperText={errors.contact}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="adultCount"
                            label="Adult Count"
                            type="number"
                            value={reservation.adultCount || 0}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="childCount"
                            label="Child Count"
                            type="number"
                            value={reservation.childCount || 0}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default MakeReservation;