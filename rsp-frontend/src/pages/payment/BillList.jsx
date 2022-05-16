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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { fetchBill, fetchBills, removeBills } from '../../api/paymentServiceApi';
import { Toaster } from 'react-hot-toast';
import { red, yellow } from '@mui/material/colors';
import { errorToast, successToast } from '../../helper/helper';


export default function BillList() {
    const [billData, setBillData] = useState([]);
    const [bill, setBill] = useState("");
    const [billID, setBillID] = useState("")
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [reqType, setReqType] = useState("")

    useEffect(() =>{
        function getBillData(){
            fetchBills()
            .then((res) =>{
                setBillData(res.data)
            }).catch((error) =>{
                console.error(error);
            })
        }
        getBillData()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleClickOpen = (billId, type) => {
        switch(type){
            case "VIEW":{
                setOpen(true);
                setReqType(type)
                setBillID(billId);
                fetchBill(billId)
                .then((res) =>{
                    setBill(res.data);
                }).catch((err) =>{
                    console.error(err);
                })
                break;
            }
            case "DELETE":{
                setOpen(true);
                setReqType(type)
                setBillID(billId);
                break;
            }
            default:{ }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteBill = () =>{
        removeBills(billID)
        .then((res) =>{
            successToast("Bill Deleted Successfully!")
            fetchBills()
            .then((res)=>{
                setBillData(res.data);
            }).catch((err) =>{
                console.error(err);
            })
        }).catch((err) =>{
            errorToast("Error in deleting the Bill!");
        })
        setOpen(false);
    }

  return (
    <div>
        <Container maxWidth={"90%"}><br/>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
        <center>
            <Typography variant='h5'><b>PAID BILLS</b></Typography><br/>
        </center>
        <Grid>
                <Paper elevation={3} style={{padding:10}} sx={{ display: 'grid'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell ><b>BILL ID</b></TableCell>
                                <TableCell ><b>USER ID</b></TableCell>
                                <TableCell ><b>BILL DATE</b></TableCell>
                                <TableCell ><b>RESERVATION ID</b></TableCell>
                                <TableCell ><b>ACTIONS</b></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    billData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                        <TableRow>
                                            <TableCell >{row.billId}</TableCell>
                                            <TableCell >{row.userId}</TableCell>
                                            <TableCell >{row.billDate}</TableCell>
                                            <TableCell >{row.reservationId}</TableCell>
                                            <TableCell >
                                                <IconButton>
                                                    <VisibilityIcon variant="contained" style={{color:yellow[700]}} onClick={()=> handleClickOpen(row.billId, "VIEW")} />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon variant="contained" style={{color:red[700]}} onClick={()=> handleClickOpen(row.billId, "DELETE")} />
                                                </IconButton>
                                                <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"}>
                                                    {
                                                        reqType === "VIEW" ?
                                                        <>
                                                            <DialogTitle><b>BILL DETAILS</b></DialogTitle>
                                                                <DialogContent>
                                                                <DialogContentText>
                                                                    Details relating to the selected Bill!
                                                                </DialogContentText>
                                                                {
                                                                    bill ?(
                                                                        <div>
                                                                            <br/>
                                                                            <Container maxWidth="100%">
                                                                            <Paper elevation={3} style={{padding:20}}>
                                                                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography align='left'><b>Bill ID : </b> {bill.billId}</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography align='left'><b> User ID : </b> {bill.userId} </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography align='left'><b> User Name : </b> {bill.userName}</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography align='left'><b> Bill Date : </b> {bill.billDate}</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography align='left'><b>Reservation ID : </b> {bill.reservationId}</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography align='left'><b>Checkout Price : </b> {bill.checkoutPrice}</Typography>
                                                                                    </Grid>
                                                                                </Grid> 
                                                                            </Paper>
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
                                                        reqType === "DELETE" ?
                                                        <>
                                                            <DialogTitle id="alert-dialog-title">Delete Bill</DialogTitle>
                                                                <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Are you sure that you want to remove this bill details? Clicking on
                                                                    "YES" will remove the Bill details!
                                                                </DialogContentText>
                                                                </DialogContent>
                                                            <DialogActions>
                                                            <Button onClick={handleClose}>NO</Button>
                                                            <Button onClick={deleteBill} autoFocus> YES </Button>
                                                            </DialogActions>
                                                        </>:
                                                        <>
                                                        </>
                                                    }
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[2, 3, 5]}
                                count={billData.length}
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
