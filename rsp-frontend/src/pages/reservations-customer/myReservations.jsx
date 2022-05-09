import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { fetchUsers } from '../../api/userServiceApi';
import jwtDecode from 'jwt-decode';
import { fetchReservation } from '../../api/reservationCustomerApi';

const MyReservations = () => {
    const userId = jwtDecode(localStorage.getItem('authentication').id);
    //const userId = 'R01';
    const [user, setUser] = useState();

    useEffect(() =>{
        function getUser(){
            fetchUsers(`?id=${userId}`)
            .then((res) =>{
                setUser(res.data);
                console.log(res.data)
            }).catch((err) =>{
                console.error(err);
            })
        }
        getUser();
    })

  return (
    <div>
       <Container>
       </Container>
    </div>
  )
}

export default MyReservations;