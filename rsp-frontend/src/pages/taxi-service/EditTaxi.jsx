import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { handleError } from '../../helper/helper';
import { updateTaxi } from '../../api/taxiServiceApi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditTaxi = (props) =>{
    const [taxi, setTaxi] = useState(props.taxi);

    const handleEditTaxi = () => {
        updateTaxi(taxi.id, taxi)
            .then((res) => {
                res.data ? 
                    props.handleFetchTaxis() :
                    handleError()
                props.setEditOpen(false)
            })
            .catch(() => handleError());
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
            case 'vehicleNo': {
                setTaxi({...taxi, vehicleNo: value});
                break;
            }
            case 'driverName': {
                setTaxi({...taxi, driverName: value});
                break;
            }
            case 'contactNumber': {
                setTaxi({...taxi, contactNumber: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Dialog open={true} onClose={() => props.setEditOpen(false)}>
            <DialogTitle>Edit Taxi</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="id"
                    value={taxi.id}
                    label="Taxi ID"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <FormControl fullWidth style={{marginTop:"8px"}}>
                    <InputLabel id="demo-simple-select-label">Vehicle Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={taxi.vehicleType}
                            label="Vehicle Type"
                            onChange={handleChange}
                            name="vehicleType"
                        >
                            <MenuItem value="Tuk">Tuk</MenuItem>
                            <MenuItem value="Car">Car</MenuItem>
                            <MenuItem value="Van">Van</MenuItem>
                            <MenuItem value="Mini Van">Mini Van</MenuItem>
                            <MenuItem value="Bus">Bus</MenuItem>
                        </Select>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    name="vehicleNo"
                    label="Vehicle Number"
                    value={taxi.vehicleNo}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="driverName"
                    label="Driver's Name"
                    value={taxi.driverName}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="contactNumber"
                    label="Driver Contact No."
                    value={taxi.contactNumber}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <br />
                <br />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditTaxi}>Edit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default EditTaxi;