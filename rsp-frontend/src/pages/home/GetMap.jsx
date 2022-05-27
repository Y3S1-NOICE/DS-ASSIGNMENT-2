import { useEffect, useState } from "react"
import { getAuth, logout } from "../../util/Utils";
import TextField from '@mui/material/TextField';
import { getAllReservations } from "../../api/reservatiosHotelApi";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { fetchMap, updateMap } from "../../api/mapService";
import { errorToast, successToast } from "../../helper/helper";
import Grid from '@mui/material/Grid';
import MapComponent from "../../components/MapComponent";

export default function GetMap() {
    const [hotels, setHotels] = useState([]);
    const [hotel, setHotel] = useState([]);
    const [lat, setLat] = useState('6.9271');
    const [lng, setLng] = useState('79.8612');
    const [role, setRole] = useState('')
    const getHotels = () => {
        fetchMap()
            .then(res => {
                const hotels_ = [];
                res.data.forEach(hotel => {
                    const hotelDetails ={
                        label: hotel.hotelName,
                        lat: hotel.lat,
                        lng: hotel.lng
                    }
                    hotels_.push(hotelDetails)
                });
                setHotels(hotels_);
            });
    }

    useEffect(() => {
        const auth = getAuth();
        !auth && logout();
        setRole(auth.role)
        console.log(auth.role)
        getHotels();
    }, []);


    return (
    <>
        <h1>Search hotels</h1>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={hotels}
                onChange={(event, hotel) => {
                    setLat(hotel.lat);
                    setLng(hotel.lng)
                    console.log(hotel)
                }}
                sx={{ width: 400 }}
                renderInput={(params) => <TextField {...params} label="Select hotel" />}
            />
            <br />
        <MapComponent lng={lng} lat={lat} width={(role==='SystemAdmin') ? '900px' : '95%'} />
        </>
    )
}