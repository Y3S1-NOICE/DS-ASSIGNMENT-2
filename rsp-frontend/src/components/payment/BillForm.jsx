import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'

export const BillForm = ({bill, onSubmit})=>{
    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues: {
            userId:bill ? bill.userId : "",
            userName:bill ? bill.userName : "",
            billDate:bill ? bill.billDate : "",
            reservationId:bill ? bill.reservationId : "",
            cardId:bill ? bill.cardId : "",
            cardNo:"",
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
                    <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" 
                    {...register("userId")} disabled/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="User Name" name="userName" type="text" size="small" fullWidth="true"
                    {...register("userName" )} disabled/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Bill Date" name="billDate" type="text" size="small" fullWidth="true"
                    {...register("billDate" )} disabled/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Reservation ID" name="reservationId" type="text" size="small" fullWidth="true"
                    {...register("reservationId" )} disabled />
                </Grid>
                <Grid item xs={12}>
                    <hr></hr>
                    <Typography>
                        <b>CARD DETAILS</b>
                    </Typography>
                </Grid>
                {
                    bill.cardId ?
                    <>
                        <Grid item xs={12}>
                            <TextField label="Card ID" name="cardId" type="text" size="small" fullWidth="true"
                            {...register("cardId" )} disabled/>
                        </Grid>
                    </>:
                    <>
                        <Grid item xs={12}>
                            <TextField label="Card Number" name="cardNo" type="text" size="small" fullWidth="true"
                            {...register("cardNo" )} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Valid Thru</Typography>
                            <TextField  name="validThru" type="date" size="small" fullWidth="true"
                            {...register("validThru" )} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="CVC" name="cvc" type="text" size="small" fullWidth="true"
                            {...register("cvc" )} />
                        </Grid>
                    </>
                }
               <Grid item xs={12}>
                    <hr></hr>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Checkout Price" name="checkoutPrice" type="text" size="small" fullWidth="true"
                    {...register("checkoutPrice" )} disabled/>
                </Grid>
                <Grid item xs={12}>
                    <TextField error={errors.email} label={ "User Email"} name="email" type="text" size="small" fullWidth="true"
                    {...register("email", {required: true} )} helperText={errors.email && "This is a required field!"} />
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