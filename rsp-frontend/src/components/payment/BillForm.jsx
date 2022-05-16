import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

export const BillForm = ({bill, onSubmit})=>{
    const [expanded, setExpanded] = React.useState(false);
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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

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
                        <b>USE CARD</b> <Switch onChange={handleChange('panel1')} defaultChecked={bill.cardId} disabled={bill.cardId}/>
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
                            <Accordion expanded={expanded === 'panel1'} >
                                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header"  >
                                    <Typography><b>CARD DETAILS</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid item xs={12}>
                                        <TextField label="Card Number" name="cardNo" type="text" size="small" fullWidth="true"
                                        {...register("cardNo" )} />
                                    </Grid><br/>
                                    <Grid container rowSpacing={1} direction="row" alignItems="center" columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs>
                                            <Typography > Valid Thru :</Typography>
                                        </Grid>
                                        <Divider orientation="vertical" flexItem/>
                                        <Grid item xs ={9}>
                                            <TextField  name="validThru" type="date" size="small" fullWidth="true"
                                            {...register("validThru" )} />
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <Grid item xs={12}>
                                        <TextField label="CVC" name="cvc" type="text" size="small" fullWidth="true"
                                        {...register("cvc" )} />
                                    </Grid>
                                </AccordionDetails>
                                </Accordion>
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