import { useEffect, useState } from "react"
import { handleError } from "../../helper/helper";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { removeTaxi, viewAllTaxis } from "../../api/taxiServiceApi";
import BookTaxi from "./BookTaxi";
import Grid from '@mui/material/Grid';

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);

const ManageTaxiCustomerView = () => {
    const [taxis, setTaxis] = useState([]);
    const [taxi, setTaxi] = useState({});
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        handleFetchTaxis();
    }, []);

    const handleFetchTaxis = () => {
        viewAllTaxis()
            .then(res => {
                res.data ?
                    setTaxis(res.data) :
                    handleError();
            })
            .catch(() => handleError());
    }

    const handleDeleteTaxi = (id) => {
        removeTaxi(id)
            .then((res) => {
                res.data ?
                    handleFetchTaxis() :
                    handleError()
            })
            .catch(() => handleError())
    }

    const setEditingTaxi = (payload) => {
        setTaxi(payload);
        setEditOpen(true);
    }

    return (
        <>
        <h1>Book Taxi</h1>
        {
            taxis && taxis.map((taxi, index) => (
                <Grid item xs={2} sm={4} md={3} key={index}>
                    <Card sx={{ maxWidth: 345 }} key={index} style={{backgroundColor:"#d4d4d4"}}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            ID - {taxi.id}
                            </Typography>
                            <Typography variant="h5" component="div">
                            {bull} <b>{taxi.vehicleType}</b> : {taxi.vehicleNo}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Driver name - {taxi.driverName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Contact Number - {taxi.contactNumber}
                            </Typography>
                        </CardContent>
                        <hr/>
                        <CardActions>
                            <Button size="small" onClick={() => setEditingTaxi(taxi)}>Book Now</Button>
                        </CardActions>
                    </Card>
                </Grid>
        ))}
            
            {editOpen && taxi &&
                <BookTaxi
                    taxi={taxi}
                    setEditOpen={setEditOpen}
                    handleFetchTaxis={handleFetchTaxis}
                />
            }
        </>
    )

}

export default ManageTaxiCustomerView;