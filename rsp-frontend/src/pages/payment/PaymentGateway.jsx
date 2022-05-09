import React from 'react'
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

export default function PaymentGateway() {
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
                            <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true"/>
                        </Grid>
                        <Grid item xs={6}>
                            {/* <Typography><b>Card Type</b></Typography> */}
                            <TextField label="User Name" name="name" type="text" size="small" fullWidth="true"/>
                        </Grid>
                        <Grid item xs={3}>
                            {/* <Typography><b>Card Type</b></Typography> */}
                            <TextField label="Bill Date" name="date" type="text" size="small" fullWidth="true"/>
                        </Grid>
                    </Grid><br />
                </Paper><br/>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Paper elevation={3} style={{padding:20}}>
                                <Typography variant='h6'><b>RESERVATION DETAILS</b></Typography><br/>
                                
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    {/* <Typography><b>Bank Name</b></Typography> */}
                                    <TextField label="Reservation ID" name="reservationId" type="text" size="small" fullWidth="true"/>
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
                                                <TableRow>
                                                    <TableCell >C0001</TableCell>
                                                    <TableCell >HNB</TableCell>
                                                    <TableCell >Visa</TableCell>
                                                    <TableCell >12/06/2023</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                                </Paper>
                                <br/>
                                <Grid item xs={6}>
                                    <Button variant="contained" type="submit">Submit</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={3} style={{padding:20}}>
                                <Typography variant='h6'><b>BILL DETAILS</b></Typography><br/>
                                <br/>
                                <BillForm />
                            </Paper>
                        </Grid>
                
                
                </Grid>
                </Paper>
            </Grid>
       </Container>
    </div>
  )
}
