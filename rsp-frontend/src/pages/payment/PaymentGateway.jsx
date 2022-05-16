import React, { useEffect, useState } from 'react'
import {useMatch}  from 'react-router-dom'
import { Container, IconButton } from '@mui/material'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BillForm } from '../../components/payment/BillForm';
import { createBill, fetchCards } from '../../api/paymentServiceApi';
import { fetchReservation } from '../../api/reservationCustomerApi';
import { fetchUsers } from '../../api/userServiceApi';
import { getAuth } from '../../util/Utils';
import { Toaster } from 'react-hot-toast';
import { createEmail } from '../../api/emailServiceApi';
import { errorToast, successToast } from '../../helper/helper';
import CancelIcon from '@mui/icons-material/Cancel';
import { red } from '@mui/material/colors';
import { sendSms } from '../../api/smsServiceApi';

export default function PaymentGateway() {
    const userId = getAuth().id;
    const match = useMatch('/payments/:id')
    const reservationId = match.params.id;
    const [user, setUser] = useState("");
    const [reservationData, setReservationData] = useState("");
    const [cardData, setCardData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [billData, setBillData] = useState("");
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = useState("");

    useEffect(() =>{
        getUser();
        getReservationData();
        getCards();
    },[userId])

    const getReservationData = () =>{
        fetchReservation(reservationId)
        .then((res) =>{
            setReservationData(res.data);
        }).catch((err) =>{
            errorToast("Error in fetching reservation details!")
        })
    }

    const getCards = () =>{
        fetchCards(userId)
        .then((res) =>{
            setCardData(res.data);
        }).catch((err) =>{
            errorToast("Error in fetching registered cards!")
        })
    }

    const getUser = () =>{
        fetchUsers(`?id=${userId}`)
        .then((res) =>{
            setUser(res.data[0]);
        }).catch((err) =>{
            errorToast("Error in fetching user details!")
        })
    }

    const selectCard = (cardId) =>{
        setSelectedCard(cardId);
        successToast("Card Selected!")
    }

    const handleClickOpen = () => {
        let dateTemplate = new Date();
        let date = (dateTemplate.getMonth()+1) + '-' + dateTemplate.getDate() + '-' + dateTemplate.getFullYear() ;
        setBillData({
            userId:userId,
            userName:user.name,
            billDate:date,
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
            if(res.status === 201){
                let emailObj ={
                    email:data.email,
                    subject:"Reservation Payment",
                    message:res.data
                }
                createEmail(emailObj)
                .then((res) =>{
                    successToast("Email sent!")
                }).catch((error) =>{
                    errorToast("Email sending failed!")
                })
                
                let smsObj ={
                    from:"Hotel Reservation System",
                    to:data.phone,
                    subject:"Reservation Payment",
                    message:res.data
                }
                sendSms(smsObj)
                .then((res) =>{
                    successToast("SMS Sent!");
                }).catch((error)=>{
                    errorToast("SMS Sending Failed!");
                })
            }
            successToast("Payment Successful!")
            setOpen(false);
            setStatus("Paid")
        }).catch((err) =>{
            errorToast("Payment Unsuccessful!")
            setOpen(false);
        })
    }

    const clear = () =>{
        setSelectedCard("");
        successToast("Card Deselected!")
    }

  return (
    <div>
        <br />
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
       <Container>
            <Typography variant='h5'>
                <center>
                    <b>PAYMENT GATEWAY</b>
                </center>
            </Typography><br/>
            <Grid>
                <Paper elevation={0} style={{padding:20, backgroundColor:'transparent'}}>
                <Paper elevation={3} style={{padding:20, backgroundColor:'transparent'}}>
                <Typography variant='h6'><b>GENERAL DETAILS</b></Typography><br/>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" defaultValue={userId} disabled />
                        </Grid>
                       
                    </Grid><br />
                </Paper><br/>
                <Paper elevation={3} style={{padding:20, backgroundColor:'transparent'}}>
                    <Typography variant='h6'><b>RESERVATION DETAILS</b></Typography><br/>
                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <TextField label="Reservation ID" name="reservationId" type="text" size="small" fullWidth="true" defaultValue={reservationId} disabled/>
                    </Grid>
                    </Grid><br/>
                    <Paper elevation={3} style={{padding:20, backgroundColor:'transparent'}}>
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
                    <Paper elevation={3} style={{padding:20, backgroundColor:'transparent'}}>
                        <Typography variant='h6'><b>CARD DETAILS</b></Typography><br/>
                        <Paper elevation={0} style={{padding:10, backgroundColor:'transparent'}} sx={{ display: 'grid'}}>
                        <TableContainer style={{opacity: 1, background: 'transparent'}}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell ><b>CARD ID</b></TableCell>
                                    <TableCell ><b>BANK NAME</b></TableCell>
                                    <TableCell ><b>CARD TYPE</b></TableCell>
                                    <TableCell ><b>VALIDITY</b></TableCell>
                                    <TableCell ><b>ACTIONS</b></TableCell>
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
                                                <Button variant='contained' onClick={()=> selectCard(row.cardId)} disabled={selectedCard === row.cardId}>Select</Button>
                                            </TableCell>
                                            <TableCell>
                                            {
                                                    selectedCard === row.cardId ?
                                                    <IconButton >
                                                        <CancelIcon style={{ color: red[500], fontSize: '25'  }}onClick={clear}/>
                                                    </IconButton>:
                                                    <>
                                                    </>
                                            }
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
                        <center>
                        {
                            status === "Paid" ?
                            <Button variant='contained' onClick={() => window.location.href='/my-reservations'} >BACK</Button>:
                            <>
                                <Button variant="contained" type="submit" onClick={handleClickOpen}>Submit</Button>
                            </>
                        }
                            
                        </center>
                        
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
                                        <Container maxWidth="100%" >
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