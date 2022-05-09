import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, TablePagination, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
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
import jwtDecode from 'jwt-decode';
import { CardForm } from './CardForm';

export default function RegisteredCards() {
    const [cardData, setCardData] = useState([]);
    const [newCard, setNewCard] = useState();
    const [card, setCard] = useState("");
    const [cardID, setCardID] = useState("");
    // const userId = jwtDecode(localStorage.getItem('authentication').id);
    const userId = "U001";
    const [open, setOpen] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

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
            fetchCards(userId)
            .then((res)=>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }).catch((err) =>{
            console.error(err);
        })
        setOpenCreate(false);
    }

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
        setNewCard({userId:userId});
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const onSubmit = (data) =>{
        updateCard(userId, cardID, data)
        .then((res) =>{
            fetchCards(userId)
            .then((res)=>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }).catch((err) =>{
            console.error(err);
        })
        setOpen(false);
    }

    const handleClickOpen = (cardId) => {
        setOpen(true);
        setCard("");
        setCardID(cardId);
        fetchCard(userId, cardId)
            .then((res) =>{
                setCard(res.data);
            }).catch((err) =>{
                console.error(err);
            })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenDelete = (cardId) => {
        setOpenDelete(true);
        setCard("");
        setCardID(cardId);
    };

    const deleteCard = () =>{
        removeCard(userId, cardID)
        .then((res) =>{
            setCard(res.data);
            fetchCards(userId)
            .then((res)=>{
                setCardData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }).catch((err) =>{
            console.error(err);
        })
        setOpenDelete(false);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  return (
    <div>
        <Container maxWidth={"90%"}><br/>
        <center>
            <Typography variant='h5'><b>REGISTERED CARDS</b></Typography><br/>
            <Button variant='contained' onClick={handleClickOpenCreate}>Add Card</Button>
            {
                 <Dialog open={openCreate} onClose={handleCloseCreate} fullWidth={true} maxWidth={"lg"}>
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
                     <Button onClick={handleCloseCreate}>Close</Button>
                     </DialogActions>
                 </Dialog>
            }
        </center><br/>
            <Grid>
                <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Card ID</TableCell>
                                <TableCell >Bank Name</TableCell>
                                <TableCell >Name On Card</TableCell>
                                <TableCell >Card Type</TableCell>
                                <TableCell >Card Number</TableCell>
                                <TableCell >Validity</TableCell>
                                <TableCell >Actions</TableCell>
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
                                                    <EditIcon variant="contained" onClick={()=> handleClickOpen(row.cardId)}>Edit Card</EditIcon>
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon variant="contained" onClick={()=> handleClickOpenDelete(row.cardId)} >Remove Card</DeleteIcon>
                                                </IconButton>
                                                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
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
                                                </Dialog>
                                                <Dialog
                                                open={openDelete}
                                                onClose={handleCloseDelete}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                Delete Card
                                                </DialogTitle>
                                                <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Are you sure that you want to remove this card details from your profile? Clicking on
                                                    "YES" will remove the card details from your profile!
                                                </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                <Button onClick={handleCloseDelete}>NO</Button>
                                                <Button onClick={deleteCard} autoFocus>
                                                    YES
                                                </Button>
                                                </DialogActions>
                                            </Dialog>
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
  )
}