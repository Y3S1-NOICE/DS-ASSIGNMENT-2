import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'

export const BillForm = ({bill, onSubmit})=>{
    const {register, handleSubmit} = useForm({
        defaultValues: {
            userId:bill ? bill.userId : "",
            userName:bill ? bill.userName : "",
            billDate:bill ? bill.billDate : "",
            reservationId:bill ? bill.reservationId : "",
            cardId:bill ? bill.cardId : "",
            checkoutPrice:bill ? bill.checkoutPrice : "",
            email: bill? bill.email:""
        }
    })
    const submitHandler = handleSubmit((data) =>{
        onSubmit(data)
        console.log(data)
    })
  return (
    <div>
        <form onSubmit={submitHandler}>
        <Paper elevation={3} style={{padding:20}}>
        <center>
            <Typography variant='h6'><b>PAYMENT DETAILS</b></Typography><br/>
        </center>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    {/* <Typography><b>User ID</b></Typography> */}
                    <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" 
                    {...register("userId")} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography><b>Card Type</b></Typography> */}
                    <TextField label="User Name" name="userName" type="text" size="small" fullWidth="true"
                    {...register("userName" )} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography><b>Card Type</b></Typography> */}
                    <TextField label="Bill Date" name="billDate" type="text" size="small" fullWidth="true"
                    {...register("billDate" )} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography><b>Card Type</b></Typography> */}
                    <TextField label="Reservation ID" name="reservationId" type="text" size="small" fullWidth="true"
                    {...register("reservationId" )} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography><b>Card Type</b></Typography> */}
                    <TextField label="Card ID" name="cardId" type="text" size="small" fullWidth="true"
                    {...register("cardId" )} />
                </Grid>
                <Grid item xs={12}>
                    {/* <Typography><b>Card Type</b></Typography> */}
                    <TextField label="Checkout Price" name="checkoutPrice" type="text" size="small" fullWidth="true"
                    {...register("checkoutPrice" )} />
                </Grid>
            </Grid><br />
            <Grid item xs={6}>
                <Button variant="contained" type="submit">Pay</Button>
            </Grid>
        </Paper>
        </form>
    </div>
  )
}
