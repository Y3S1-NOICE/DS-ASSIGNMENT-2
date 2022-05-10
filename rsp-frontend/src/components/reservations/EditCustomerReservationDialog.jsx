import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { handleError } from '../../helper/helper';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast, { Toaster } from 'react-hot-toast';
import { updateReservation } from '../../api/reservationCustomerApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditMyReservation = (props) =>{
    const [reservation, setReservation] = useState(props.reservation);

    const handleSubmit = () => {
        updateReservation(reservation.id, reservation)
            .then((res) => {
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
                window.location.reload('/hotel/reservations');
                //props.setEditOpen(false);
            })
            .catch((e) => {
                //console.log(e);
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

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'hotelName': {
                setReservation({...reservation, hotelName: value});
                break;
            }
            case 'reserveeName': {
                setReservation({...reservation, reserveeName: value});
                break;
            }
            case 'contact': {
                setReservation({...reservation, contact: value});
                break;
            }
            case 'hotelContact': {
                setReservation({...reservation, hotelContact: value});
                break;
            }
            case 'email': {
                setReservation({...reservation, email: value});
                break;
            }
            case 'checkInDate': {
                setReservation({...reservation, checkInDate: value});
                break;
            }
            case 'checkOutDate': {
                setReservation({...reservation, checkOutDate: value});
                break;
            }
            case 'nightCount': {
                setReservation({...reservation, nightCount: value});
                break;
            }
            case 'roomCount': {
                setReservation({...reservation, roomCount: value});
                break;
            }
            case 'totalPrice': {
                setReservation({...reservation, totalPrice: value});
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
                            variant="outlined"
                            onChange={handleChange}
                            disabled={true}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="reserveeName"
                            label="Reservee Name"
                            type="text"
                            value={reservation.reserveeName || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ required: true }}
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
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ required: true }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="email"
                            label="Email"
                            type="text"
                            value={reservation.email || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
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
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="checkOutDate"
                            label="Check Out Date"
                            type="date"
                            value={reservation.checkOutDate || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
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
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="roomCount"
                            label="Room Count"
                            type="number"
                            value={reservation.roomCount || 0}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="totalPrice"
                            label="Total Price(LKR)"
                            type="number"
                            disabled={true}
                            value={reservation.totalPrice}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="adultCount"
                            label="Adult Count"
                            type="number"
                            value={reservation.adultCount || 0}
                            fullWidth
                            variant="outlined"
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
                            variant="outlined"
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


export default EditMyReservation;