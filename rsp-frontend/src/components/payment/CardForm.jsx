import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'
import Divider from '@mui/material/Divider';

export const CardForm = ({card, onSubmit})=>{
    const {register, handleSubmit, formState:{errors}} = useForm({
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
                    <TextField label="User ID" name="userId" type="text" size="small" fullWidth="true" 
                    {...register("userId")} disabled/>
                </Grid>
                <Grid item xs={6}>
                    <TextField error={errors.cardType} label="Card Type" name="cardType" type="text" size="small" fullWidth="true"
                    {...register("cardType", {required: true} )} helperText={errors.cardType && "This is a required field!"} />
                </Grid>
            </Grid><br />
        </Paper><br/>
        <Paper elevation={3} style={{padding:20}}>
            <Typography variant='h6'><b>CARD DETAILS</b></Typography><br/>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <TextField error={errors.bankName} label="Bank Name" name="bankName" type="text" size="small" fullWidth="true" 
                {...register("bankName", {required: true} )} helperText={errors.bankName && "This is a required field!"} />
            </Grid>
            <Grid item xs={6}>
                    <TextField error={errors.cardNo} label="Card Number" name="cardNo" type="text" size="small" fullWidth="true"
                    {...register("cardNo", {required: true} )} helperText={errors.cardNo && "This is a required field!"} />
                </Grid>
                <Grid item xs={6}>
                    <TextField error={errors.nameOnCard} label="Name On Card" name="nameOnCard" type="text" size="small" fullWidth="true"
                    {...register("nameOnCard", {required: true} )} helperText={errors.nameOnCard && "This is a required field!"} />
                </Grid>
                <Grid item xs={6}>
                    <Grid container rowSpacing={1} direction="row" alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                            <Typography > Valid Thru :</Typography>
                        </Grid>
                        <Grid item xs ={9}>
                            <TextField error={errors.validThru} name="validThru" type="date" size="small" fullWidth="true"
                            {...register("validThru", {required: true} )} helperText={errors.validThru && "This is a required field!"} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <TextField error={errors.cvc} label="CVC" name="cvc" type="text" size="small" fullWidth="true" 
                    {...register("cvc", {required: true} )} helperText={errors.cvc && "This is a required field!"} />
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