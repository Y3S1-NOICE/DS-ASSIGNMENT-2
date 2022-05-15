import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { updateStatus } from '../../api/reservationCustomerApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditStatus = (props) =>{
    const [reservation, setReservation] = useState(props.reservation);

    const handleSubmit = () => {
        updateStatus(reservation.id, reservation)
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
                props.setEditOpen(false);
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
            case 'status': {
                setReservation({...reservation, status: value});
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
            <DialogTitle>Add Reservation Status</DialogTitle>
            <br/>
            <DialogContent style={{width:"500px", height:"100px"}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Reservation Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={reservation.status}
                            name="status"
                            label="Reservation Status"
                            onChange={handleChange}
                            variant="outlined"
                        >
                            <MenuItem value="Reservation Pending">Reservation Pending</MenuItem>
                            <MenuItem value="Reservation Confirmed">Reservation Confirmed</MenuItem>
                            <MenuItem value="Dates Unavailable">Dates Unavailable</MenuItem>
                            <MenuItem value="Please Enter valid details">Please Enter valid details</MenuItem>
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


export default EditStatus;