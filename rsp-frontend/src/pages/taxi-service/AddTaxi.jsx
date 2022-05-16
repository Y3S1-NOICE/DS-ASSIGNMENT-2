import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { handleError } from '../../helper/helper';
import { addTaxi } from '../../api/taxiServiceApi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreateTaxi = () => {
    const [taxi, setTaxi] = useState({});

    const handleSubmit = () => {
        addTaxi(taxi)
            .then(res => {
                window.location.href='/manage-taxis';
                console.log(res.data);
            })
            .catch(() => handleError())
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
        <>
            <h1>Create Taxi</h1>
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
                    <InputLabel id="demo-simple-select-standard-label">Vehicle Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={taxi.vehicleType}
                            label="Vehicle Type"
                            onChange={handleChange}
                            name="vehicleType"
                            variant="standard"
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
            <Button onClick={handleSubmit}>Create Taxi</Button>
        </>
    );
}

export default CreateTaxi;