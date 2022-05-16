import { useEffect, useState } from "react"
import { handleError } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import { removeTaxi, viewAllTaxis } from "../../api/taxiServiceApi";
import EditTaxi from "./EditTaxi";

const Taxis = () => {
    const [taxis, setTaxis] = useState([]);
    const [taxi, setTaxi] = useState({});
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        handleFetchTaxis();
    }, []);

    const handleFetchTaxis = () => {
        viewAllTaxis()
            .then(res => {
                res.data ?
                    setTaxis(res.data) :
                    handleError();
            })
            .catch(() => handleError());
    }

    const handleDeleteTaxi = (id) => {
        removeTaxi(id)
            .then((res) => {
                res.data ?
                    handleFetchTaxis() :
                    handleError()
            })
            .catch(() => handleError())
    }

    const setEditingTaxi = (payload) => {
        setTaxi(payload);
        setEditOpen(true);
    }

    return (
        <>
        <h1>Taxi Service</h1>
        <a href="/addTaxi"><Button>Add Taxi</Button></a>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Taxi ID</TableCell>
                            <TableCell align="left">Vehicle Type</TableCell>
                            <TableCell align="center">Vehicle Number</TableCell>
                            <TableCell align="center">Driver name</TableCell>
                            <TableCell align="center">Contact Number</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taxis && taxis.map((taxi, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {taxi.id}
                                </TableCell>
                                <TableCell align="left">{taxi.vehicleType}</TableCell>
                                <TableCell align="center">{taxi.vehicleNo}</TableCell>
                                <TableCell align="center">{taxi.driverName}</TableCell>
                                <TableCell align="center">{taxi.contactNumber}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => setEditingTaxi(taxi)}>Edit</Button>
                                    <Button onClick={() => handleDeleteTaxi(taxi.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {editOpen && taxi &&
                <EditTaxi
                    taxi={taxi}
                    setEditOpen={setEditOpen}
                    handleFetchTaxis={handleFetchTaxis}
                />
            }
        </>
    )

}

export default Taxis;