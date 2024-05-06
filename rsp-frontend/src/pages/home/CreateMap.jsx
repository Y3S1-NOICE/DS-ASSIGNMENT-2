import { useEffect, useState } from "react"
import { getAuth, logout } from "../../util/Utils";
import TextField from '@mui/material/TextField';
import { getAllReservations } from "../../api/reservatiosHotelApi";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { updateMap } from "../../api/mapService";
import { errorToast, successToast } from "../../helper/helper";
import Grid from '@mui/material/Grid';

export default function CreateMap() {
    const [hotelNames, setHotelNames] = useState([]);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [hotelName, setHotelName] = useState([]);

    const getHotelNames = () => {
        getAllReservations()
            .then(res => {
                const hotelNames_ = [];
                res.data.forEach(hotel => hotelNames_.push(hotel.hotelName));
                setHotelNames(hotelNames_);
            });
    }

    const createMapData = () => {
        const payLoad = {
            lat: lat,
            lng: lng,
            hotelName: hotelName
        }
        updateMap(payLoad)
            .then(res => {
                successToast('Map data updated!')
                window.location.reload(true)
            })
            .catch(res => errorToast('Something went wrong!'))
    
    }

    useEffect(() => {
        const auth = getAuth();
        !auth && logout();
        getHotelNames();
    }, []);


    return (
        <>
            <h1>Update hotel Location</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={hotelNames}
                onChange={(event, hotel) => {
                    setHotelName(hotel);
                }}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Select hotel" />}

            />
            <Grid container
            >
            <TextField
                autoFocus
                margin="dense"
                name="lat"
                label="lat"
                sx={{ width: 200 }}
                variant="outlined"
                onChange={(e) => setLat(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                name="lng"
                label="lng"
                sx={{ width: 200 }}
                variant="outlined"
                onChange={(e) => setLng(e.target.value)}
            />
            </Grid>
            <Button onClick={createMapData}>Update Location</Button>
        </>
    )
}