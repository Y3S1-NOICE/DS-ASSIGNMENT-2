import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'

export const CardForm = ({card, onSubmit})=>{
    const {register, handleSubmit} = useForm({
        defaultValues: {
            userId:card ? card.userId : "",
            cardType:card ? card.cardType : "",
            bankName:card ? card.bankName : "",
            nameOnCard:card ? card.nameOnCard : "",
            cardNo:card ? card.cardNo : "",
            validThru:card ? card.validThru : "",
            cvc:card ? card.cvc : ""
        }
    })
    const submitHandler = handleSubmit((data) =>{
        onSubmit(data)
        console.log(data)
    })
  return (
    <div>
        <Paper elevation={3} style={{padding:20}}>
        <form onSubmit={submitHandler}>
        <Paper elevation={3} style={{padding:20}}>
        <Typography variant='h6'><b>GENERAL DETAILS</b></Typography><br/>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    {/* <Typography><b>User ID</b></Typography> */}
                    <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" 
                    {...register("userId")} />
                </Grid>
                <Grid item xs={6}>
                    {/* <Typography><b>Card Type</b></Typography> */}
                    <TextField label="Card Type" name="cardType" type="text" size="small" fullWidth="true"
                    {...register("cardType" )} />
                </Grid>
            </Grid><br />
        </Paper><br/>
        <Paper elevation={3} style={{padding:20}}>
            <Typography variant='h6'><b>CARD DETAILS</b></Typography><br/>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                {/* <Typography><b>Bank Name</b></Typography> */}
                <TextField label="Bank Name" name="bankName" type="text" size="small" fullWidth="true" 
                {...register("bankName")} />
            </Grid>
            <Grid item xs={6}>
                    {/* <Typography><b>Card Number</b></Typography> */}
                    <TextField label="Card Number" name="cardNo" type="text" size="small" fullWidth="true"
                    {...register("cardNo")} />
                </Grid>
                <Grid item xs={6}>
                    {/* <Typography><b>Name on Card</b></Typography> */}
                    <TextField label="Name On Card" name="nameOnCard" type="text" size="small" fullWidth="true"
                    {...register("nameOnCard")} />
                </Grid>
                <Grid item xs={6}>
                    {/* <Typography><b>Valid Thru</b></Typography> */}
                    <TextField  type="date" name="validThru" size="small" fullWidth="true" 
                    {...register("validThru")} />
                </Grid>
                <Grid item xs={6}>
                    {/* <Typography><b>CVC</b></Typography> */}
                    <TextField label="CVC" name="cvc" type="text" size="small" fullWidth="true" 
                    {...register("cvc")} />
                </Grid>
            </Grid>
            <br/>
            <Grid item xs={6}>
                <Button variant="contained" type="submit">Submit</Button>
            </Grid>
        </Paper>
        </form>
        </Paper>
    </div>
  )
}