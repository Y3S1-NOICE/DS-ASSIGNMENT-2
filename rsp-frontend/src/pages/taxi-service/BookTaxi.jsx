import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchUsers } from '../../api/userServiceApi';
import { getAuth } from '../../util/Utils';
import { addCustomer } from '../../api/taxiServiceApi';

const BookTaxi = (props) =>{
    const userId = getAuth().id;
    const [taxi, setTaxi] = useState(props.taxi);
    const [user, setUser] = useState([]);

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

    const handleSubmit = () => {
        const book = {
            id: userId,
            vehicleType: taxi.vehicleType,
            driverName: taxi.driverName,
            name: taxi.name,
            contactNumber: taxi.contactNumber,
            pickUp: taxi.pickUp,
            dropOff: taxi.dropOff
        }
        addCustomer(book)
            .then((res) => {
                console.log(res.data)
                props.handleFetchTaxis();
                window.location.reload('/taxi');
                //props.setEditOpen(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'id': {
                setTaxi({...taxi, id: value});
                break;
            }
            case 'vehicleType': {
                setTaxi({...taxi, vehicleType: value});
                break;
            }
            case 'driverName': {
                setTaxi({...taxi, driverName: value});
                break;
            }
            case 'name': {
                setTaxi({...taxi, name: value});
                break;
            }
            case 'contactNumber': {
                setTaxi({...taxi, contactNumber: value});
                break;
            }
            case 'pickUp': {
                setTaxi({...taxi, pickUp: value});
                break;
            }
            case 'dropOff': {
                setTaxi({...taxi, dropOff: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Dialog 
            open={true} 
            onClose={() => props.setEditOpen(false)}
            keepMounted
        >
            <DialogTitle>Book Taxi</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="id"
                            label="Your ID"
                            type="text"
                            value={userId}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            disabled={true}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="vehicleType"
                            label="Vehicle Type"
                            type="text"
                            value={taxi.vehicleType || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ required: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="driverName"
                            label="Driver Name"
                            type="text"
                            value={taxi.driverName}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            defaultValue={userId}
                            disabled={true}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Your Name"
                            type="text"
                            value={taxi.name|| ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="Ccontact Number"
                            label="contactNumber"
                            type="text"
                            value={taxi.contactNumber || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="pickUp"
                            label="PickUp Address"
                            type="text"
                            value={taxi.pickUp || ''}
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
                            name="dropOff" 
                            label="DropOff Address"
                            type="text"
                            value={taxi.dropOff || ''}
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

export default BookTaxi;