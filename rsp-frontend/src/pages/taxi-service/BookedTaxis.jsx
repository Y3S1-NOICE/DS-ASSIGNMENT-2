import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchUsers } from '../../api/userServiceApi';
import { getAuth } from '../../util/Utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import PaymentIcon from '@mui/icons-material/Payment';
import IconButton from '@mui/material/IconButton';
import { removeCustomer, viewAllCustomers } from '../../api/taxiServiceApi';

const MyBookedTaxis = () => {
    const loggedUserId = getAuth().id;
    const [taxis, setTaxis] = useState([]);
    const [user, setUser] = useState();

    useEffect(() =>{
        function getUser() {
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

    useEffect(() => {
        handleGetTaxis();
    }, []);

    const handleGetTaxis = () => {
        viewAllCustomers().then(res => {
            setTaxis(res.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    const handleDeleteTaxi = (id) => {
        removeCustomer(id)
            .then((res) => {
                handleGetTaxis();
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <div>
        <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Your ID</TableCell>
                                <TableCell align="center" >Vehicle Type</TableCell>
                                <TableCell align="center" >Driver Name</TableCell>
                                <TableCell align="center" >Your Name</TableCell>
                                <TableCell align="center" >Contact Number</TableCell>
                                <TableCell align="center" >Pickup Address</TableCell>
                                <TableCell align="center" >Dropoff Address</TableCell>
                                <TableCell align="right" > Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                taxis.map((taxi, index) => (
                                    taxi.id === loggedUserId && (
                                        <>
                                    <TableRow key={index}>
                                        <TableCell align="left">{taxi.id}</TableCell>
                                        <TableCell align="center">{taxi.vehicleType}</TableCell>
                                        <TableCell align="center">{taxi.driverName}</TableCell>
                                        <TableCell align="center">{taxi.name}</TableCell>
                                        <TableCell align="center">{taxi.contactNumber}</TableCell>
                                        <TableCell align="center">{taxi.pickUp}</TableCell>
                                        <TableCell align="center">{taxi.dropOff}</TableCell>
                                        <TableCell align="right">
                                            <Stack direction="row" spacing={1}>
                                                <IconButton aria-label="delete" style={{color:"#FF0000"}} onClick={() => handleDeleteTaxi(taxi.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                    </>
                                    )
                                ))
                            } 
                        </TableBody>
                    </Table>
                </TableContainer>
        </>
        </div>
  )
}

export default MyBookedTaxis;