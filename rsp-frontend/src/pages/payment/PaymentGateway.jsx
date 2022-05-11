import React, { useEffect, useState } from 'react'
import {useMatch}  from 'react-router-dom'
import { Container } from '@mui/material'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { BillForm } from '../../components/payment/BillForm';
import { createBill, fetchCards } from '../../api/paymentServiceApi';
import jwtDecode from 'jwt-decode';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchReservation } from '../../api/reservationCustomerApi';
import { fetchUsers } from '../../api/userServiceApi';
import { getAuth } from '../../util/Utils';

export default function PaymentGateway() {
    const userId = getAuth().id;
    const match = useMatch('/payments/:id')
    const reservationId = match.params.id;
    const [user, setUser] = useState("");
    const [reservationData, setReservationData] = useState("");
    const [cardData, setCardData] = useState([]);
    const [selectedCard, setSelectedCard] = useState("");
    const [billData, setBillData] = useState("");
    const [open, setOpen] = React.useState(false);


    useEffect(() =>{
        function getUser(){
            console.log(userId)
            fetchUsers(`?id=${userId}`)
            .then((res) =>{
                setUser(res.data[0]);
                console.log(user.name)
            }).catch((err) =>{
                console.error(err);
            })
        }
        getUser();
    },[userId])

    useEffect(() =>{
        function getResevationData(){   
            fetchReservation(reservationId)
            .then((res) =>{
                setReservationData(res.data);
                console.log(reservationData)
            }).catch((err) =>{
                console.error(err);
            })
        }
        getResevationData();
    },[])

    useEffect(()=>{
        console.log(user.name)
        function getCards(){
            fetchCards(userId)
            .then((res) =>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getCards();
    },[reservationData])

    const selectCard = (cardId) =>{
        setSelectedCard(cardId);
    }

    const handleClickOpen = () => {
        setBillData({
            userId:userId,
            userName:user.name,
            reservationId:reservationId,
            cardId:selectedCard,
            checkoutPrice:reservationData.totalPrice
        })
        setOpen(true);       
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) =>{
        createBill(userId, data)
        .then((res) =>{
            console.log(res.data)
        }).catch((err) =>{
            console.error(err);
        })
    }

  return (
    <div>
        <br />
       <Container>
            <Typography variant='h5'>
                <center>
                    <b>PAYMENT GATEWAY</b>
                </center>
            </Typography><br/>
            <Grid>
                <Paper elevation={3} style={{padding:20}}>
                <Paper elevation={3} style={{padding:20}}>
                <Typography variant='h6'><b>GENERAL DETAILS</b></Typography><br/>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" defaultValue={userId} disabled />
                        </Grid>
                    </Grid><br />
                </Paper><br/>
                <Paper elevation={3} style={{padding:20}}>
                    <Typography variant='h6'><b>RESERVATION DETAILS</b></Typography><br/>
                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        {/* <Typography><b>Bank Name</b></Typography> */}
                        <TextField label="Reservation ID" name="reservationId" type="text" size="small" fullWidth="true" defaultValue={reservationId}/>
                    </Grid>
                    </Grid><br/>
                    <Paper elevation={3} style={{padding:20}}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Hotel Name : </b> {reservationData.hotelName}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align='right'><b>Check In Date : </b> {reservationData.checkInDate} </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align='left'><b>Check Out Date : </b> {reservationData.checkOutDate}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr></hr>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Night Count : </b> {reservationData.nightCount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Room Count : </b> {reservationData.roomCount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Adult Count : </b> {reservationData.adultCount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Children Count : </b> {reservationData.childCount}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr></hr>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Total Price : Rs.</b>{reservationData.totalPrice}</Typography>
                            </Grid>
                        </Grid> 
                    </Paper>
                    <br/>
                    <Paper elevation={3} style={{padding:20}}>
                        <Typography variant='h6'><b>CARD DETAILS</b></Typography><br/>
                        <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Card ID</TableCell>
                                    <TableCell >Bank Name</TableCell>
                                    <TableCell >Card Type</TableCell>
                                    <TableCell >Validity</TableCell>
                                    <TableCell >Actions</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cardData.map((row) =>(
                                        <TableRow>
                                            <TableCell >{row.cardId}</TableCell>
                                            <TableCell >{row.bankName}</TableCell>
                                            <TableCell >{row.cardType}</TableCell>
                                            <TableCell >{row.validThru}</TableCell>
                                            <TableCell>
                                                <Button variant='contained' onClick={()=> selectCard(row.cardId)}>Select</Button>
                                            </TableCell>
                                        </TableRow>
                                        ))
                                    }
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    </Paper>
                    <br/>
                    <Grid item xs={6}>
                        <Button variant="contained" type="submit" onClick={handleClickOpen}>Submit</Button>
                        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                        <DialogTitle><b>MAKE PAYMENT</b></DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            This window will allow you to make your payment!
                        </DialogContentText>
                            {
                                billData ?(
                                    <div>
                                        <br/>
                                        <Container maxWidth="100%">
                                            <BillForm bill={billData} onSubmit={onSubmit}/>
                                        </Container>
                                    </div>
                                ):(
                                    <div> 
                                        Loading.....
                                    </div>
                                )
                            }
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Paper>
                </Paper>
            </Grid>
       </Container>
    </div>
  )
}

{/* <Grid item xs={6}>
<Paper elevation={3} style={{padding:20}}>
    <Typography variant='h6'><b>BILL DETAILS</b></Typography><br/>
    <br/>
    <BillForm bill={billData}/>
</Paper>
</Grid> */}