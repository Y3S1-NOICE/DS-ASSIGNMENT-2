import React, { useEffect, useState } from 'react'
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
import { BillForm } from './BillForm';
import { createBill, fetchCards } from '../../api/paymentServiceApi';
import jwtDecode from 'jwt-decode';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchReservation } from '../../api/reservationCustomerApi';

export default function PaymentGateway() {
    // const userId = jwtDecode(localStorage.getItem('authentication').id);
    const userId = "U001";
    const reservationId ="R001";
    const [user, setUser] = useState();
    const [reservationData, setReservationData] = useState();
    const [cardData, setCardData] = useState([]);
    const [selectedCard, setSelectedCard] = useState("");
    const [billData, setBillData] = useState("");
    const [open, setOpen] = React.useState(false);

    // useEffect(() =>{
    //     function getUser(){
    //         fetchUsers(`?id=${userId}`)
    //         .then((res) =>{
    //             setUser(res.data);
    //         }).catch((err) =>{
    //             console.error(err);
    //         })
    //     }
    //     getUser();
    // })

    // useEffect(() =>{
    //     function getResevationData(){   
    //         fetchReservation(reservationId)
    //         .then((res) =>{
    //             setReservationData(res.data);
    //         }).catch((err) =>{
    //             console.error(err);
    //         })
    //     }
    //     getResevationData();
    // })

    useEffect(()=>{
        function getCards(){
            fetchCards(userId)
            .then((res) =>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getCards();
    },[])

    const selectCard = (cardId) =>{
        setSelectedCard(cardId);
    }


    const handleClickOpen = () => {
        setBillData({
            userId:userId,
            reservationId:reservationId,
            cardId:selectedCard,
            checkoutPrice:"50000"
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
       <Container>
            <Grid>
                <Paper elevation={3} style={{padding:20}}>
                <Paper elevation={3} style={{padding:20}}>
                <Typography variant='h6'><b>GENERAL DETAILS</b></Typography><br/>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            {/* <Typography><b>User ID</b></Typography> */}
                            <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" defaultValue={userId} disabled />
                        </Grid>
                        <Grid item xs={9}>
                            {/* <Typography><b>Card Type</b></Typography> */}
                            <TextField label="User Name" name="name" type="text" size="small" fullWidth="true"/>
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
                                <Typography align='center'><b>Hotel Name : </b> Hotel Glassgow</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align='right'><b>Check In Date : </b> 12/05/2022 </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align='left'><b>Check Out Date : </b> 14/05/2022</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr></hr>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Night Count : </b> 1</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Room Count : </b> 2</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Adult Count : </b> 4</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Children Count : </b> 5</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <hr></hr>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align='center'><b>Total Price : Rs.</b> 25,000.00</Typography>
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