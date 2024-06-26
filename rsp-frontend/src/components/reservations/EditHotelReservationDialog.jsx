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
import { updateReservation } from '../../api/reservatiosHotelApi';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast, { Toaster } from 'react-hot-toast';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditReservation = (props) =>{
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
            case 'hotelRatings': {
                setReservation({...reservation, hotelRatings: value});
                break;
            }
            case 'hotelAddress': {
                setReservation({...reservation, hotelAddress: value});
                break;
            }
            case 'hotelContact': {
                setReservation({...reservation, hotelContact: value});
                break;
            }
            case 'hotelImage': {
                setReservation({...reservation, hotelImage: value});
                break;
            }
            case 'description': {
                setReservation({...reservation, description: value});
                break;
            }
            case 'availableRooms': {
                setReservation({...reservation, availableRooms: value});
                break;
            }
            case 'totalPrice': {
                setReservation({...reservation, totalPrice: value});
                break;
            }
            case 'isHotelAvailable': {
                setReservation({...reservation, isHotelAvailable: value});
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
            <DialogTitle>Update Reservation</DialogTitle>
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
                        />
                        {/* <TextField
                            autoFocus
                            margin="dense"
                            name="hotelRatings"
                            label="hotelRatings"
                            type="number"
                            value={reservation.hotelRatings || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        /> */}
                        <FormControl fullWidth style={{marginTop:"8px"}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Hotel Ratings</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={reservation.hotelRatings || 0}
                                label="Hotel Ratings"
                                onChange={handleChange}
                                name="hotelRatings"
                            >
                            <MenuItem value="Tourist">Tourist</MenuItem>
                            <MenuItem value="Standard">Standard</MenuItem>
                            <MenuItem value="Comfort">Comfort</MenuItem>
                            <MenuItem value="First Class">First Class</MenuItem>
                            <MenuItem value="Luxury">Luxury</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="hotelAddress"
                            label="Hotel Address"
                            type="text"
                            value={reservation.hotelAddress || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="hotelContact"
                            label="Hotel Contact"
                            type="text"
                            value={reservation.hotelContact || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="hotelImage"
                            label="Hotel Image"
                            type="text"
                            value={reservation.hotelImage || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            value={reservation.description || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="availableRooms"
                            label="Available Rooms"
                            type="number"
                            value={reservation.availableRooms || 0}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <FormControl fullWidth style={{marginTop:"8px"}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Hotel Available Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={reservation.isHotelAvailable || ''}
                                label="Hotel Available Status"
                                onChange={handleChange}
                                name="isHotelAvailable"
                            >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Not Available">Not Available</MenuItem>
                            </Select>
                        </FormControl>
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


export default EditReservation;