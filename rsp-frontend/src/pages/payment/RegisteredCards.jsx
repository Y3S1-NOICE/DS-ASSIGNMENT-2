import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { addCard, fetchCard, fetchCards, removeCard, updateCard } from '../../api/paymentServiceApi';
import { CardForm } from '../../components/payment/CardForm'
import { getAuth } from '../../util/Utils';
import {yellow} from '@mui/material/colors'
import { Toaster } from 'react-hot-toast';
import { red } from '@mui/material/colors';
import { errorToast, successToast } from '../../helper/helper';

export default function RegisteredCards() {
    const userId = getAuth().id
    const [cardData, setCardData] = useState([]);
    const [newCard, setNewCard] = useState();
    const [card, setCard] = useState("");
    const [cardID, setCardID] = useState("");
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [reqType, setReqType] = useState("");

    useEffect(() =>{
        function getCardData(){
            fetchCards(userId)
            .then((res) =>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getCardData();
    },[])
    
    const onCreate = (data) =>{
        addCard(userId, data)
        .then((res) =>{
            successToast("Card Registration Successful!")
            fetchCards(userId)
            .then((res)=>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }).catch((err) =>{
            console.error(err);
            errorToast("Card Registration Failed!")
        })
        setOpen(false);
    }

    const onSubmit = (data) =>{
        updateCard(userId, cardID, data)
        .then((res) =>{
            fetchCards(userId)
            .then((res)=>{
                setCardData(res.data);
                successToast("Card details updated Successfully!")
            }).catch((err) =>{
                console.error(err);
                errorToast("Card details update Failed!")
            })
        }).catch((err) =>{
            console.error(err);
        })
        setOpen(false);
    }

    const handleClickOpen = (cardId, type) => {
        switch(type){
            case 'ADD-CARD':{
                console.log(cardData.length)
                setOpen(true)
                setReqType(type)
                setNewCard({userId:cardId})
                break;
            }
            case 'EDIT-CARD':{
                setOpen(true);
                setReqType(type)
                setCard("");
                setCardID(cardId)
                fetchCard(userId, cardId)
                .then((res) =>{
                    setCard(res.data);
                }).catch((err) =>{
                    console.error(err);
                })
                break;
            }
            case 'DELETE-CARD':{
                setOpen(true);
                setReqType(type)
                setCard("")
                setCardID(cardId)
                break;
            }
            default:{ }
        }
       
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteCard = () =>{
        removeCard(userId, cardID)
        .then((res) =>{
            successToast("Card Details Removed Successfully!")
            setCard(res.data);
            fetchCards(userId)
            .then((res)=>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }).catch((err) =>{
            console.error(err);
            errorToast("Card Details Removal Failed!")
        })
        setOpen(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return cardData.length !== 0 ?(
    <div>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <Container maxWidth={"90%"}><br/>
        <center>
            <Typography variant='h5'><b>REGISTERED CARDS</b></Typography><br/>
            <Button variant='contained' onClick={()=> handleClickOpen(userId, "ADD-CARD")}>Add Card</Button>
        </center><br/>
            <Grid>
                <Paper elevation={0} style={{padding:10, backgroundColor:'transparent'}} sx={{ display: 'grid'}}>
                    <TableContainer style={{opacity: 1, background: 'transparent'}}>
                        <Table sx={{ minWidth: 650 }}  aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <TableCell><b>CARD ID</b></TableCell>
                                <TableCell ><b>BANK NAME</b></TableCell>
                                <TableCell ><b>NAME ON CARD</b></TableCell>
                                <TableCell ><b>CARD TYPE</b></TableCell>
                                <TableCell ><b>CARD NUMBER</b></TableCell>
                                <TableCell ><b>VALIDITY</b></TableCell>
                                <TableCell ><b>ACTIONS</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cardData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                        <TableRow>
                                            <TableCell >{row.cardId}</TableCell>
                                            <TableCell >{row.bankName}</TableCell>
                                            <TableCell >{row.nameOnCard}</TableCell>
                                            <TableCell >{row.cardType}</TableCell>
                                            <TableCell >{row.cardNo}</TableCell>
                                            <TableCell >{row.validThru}</TableCell>
                                            <TableCell >
                                                <IconButton>
                                                    <EditIcon variant="contained" style={{color:yellow[700]}} onClick={()=> handleClickOpen(row.cardId, "EDIT-CARD")}>Edit Card</EditIcon>
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon variant="contained" style={{color:red[700]}} onClick={()=> handleClickOpen(row.cardId, "DELETE-CARD")} >Remove Card</DeleteIcon>
                                                </IconButton>
                                                {
                                                    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                                                    {
                                                        reqType === "ADD-CARD" ?
                                                        <>
                                                            <DialogTitle><b>ADD CARD</b></DialogTitle>
                                                                <DialogContent>
                                                                <DialogContentText>
                                                                    This window will allow you to Add a card to your profile!
                                                                </DialogContentText>
                                                                    {
                                                                        newCard ?(
                                                                            <div>
                                                                                <br/>
                                                                                <Container maxWidth="100%">
                                                                                    <CardForm card={newCard} onSubmit={onCreate}/>
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
                                                        </>:
                                                        reqType === "EDIT-CARD" ?
                                                        <>
                                                            <DialogTitle><b>EDIT CARD</b></DialogTitle>
                                                                <DialogContent>
                                                                <DialogContentText>
                                                                    This window will allow you to update your card details!
                                                                </DialogContentText>
                                                                    {
                                                                        card ?(
                                                                            <div>
                                                                                <br/>
                                                                                <Container maxWidth="100%">
                                                                                    <CardForm card={card} onSubmit={onSubmit}/>
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
                                                        </>:
                                                        reqType === "DELETE-CARD" ?
                                                        <>
                                                            <DialogTitle id="alert-dialog-title">Delete Card</DialogTitle>
                                                                <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Are you sure that you want to remove this card details from your profile? Clicking on
                                                                    "YES" will remove the card details from your profile!
                                                                </DialogContentText>
                                                                </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose}>NO</Button>
                                                                <Button onClick={deleteCard} autoFocus>YES</Button>
                                                            </DialogActions>

                                                        </>:
                                                        <>
                                                        </>
                                                    }
                                                    </Dialog>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[2, 3, 5]}
                                count={cardData.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid> 
        </Container>
    </div>
    ):(
    <div>
    <Container maxWidth={"90%"}><br/>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <center>
            <Typography variant='h5'><b>REGISTERED CARDS</b></Typography>
            <Typography style={{color:red[500]}}><b>NO REGISTERD CARDS FOUND! ADD A NEW CARD!</b></Typography><br/>
            <Button variant='contained' onClick={()=>handleClickOpen(userId, "ADD-CARD")}>Add Card</Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                {
                reqType === "ADD-CARD" ?
                <>
                    <DialogTitle><b>ADD CARD</b></DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            This window will allow you to Add a card to your profile!
                        </DialogContentText>
                            {
                                newCard ?(
                                    <div>
                                        <br/>
                                        <Container maxWidth="100%">
                                            <CardForm card={newCard} onSubmit={onCreate}/>
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
                </>:
                <>
                </>
            }
            </Dialog>
        </center><br/>
    </Container>
    </div>
    )
}