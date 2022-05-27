import { useEffect, useState } from "react"
import { handleError } from "../../helper/helper";
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import { deleteUser, fetchUsers } from "../../api/userServiceApi";
import EditUser from "./EditUser";
import AlertDialog from "../../components/alert/AlertDialog";
import { errorToast, successToast } from "../../helper/helper";

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleConfirmationOpen = (user) => {
        setUser(user)
        setOpenConfirmation(true);
    };
  
    const handleConfirmationClose = () => {
        setOpenConfirmation(false);
    };
  
    useEffect(() => {
        handleFetchUsers();
    }, []);

    const handleFetchUsers = () => {
        fetchUsers('/')
            .then(res => {
                res.data ?
                    setUsers(res.data) :
                    handleError();
            })
            .catch(() => handleError());
    }

    const handleDeleteUser = (id) => {
        handleConfirmationClose();
        deleteUser(id)
            .then((res) => {
                if(res.data) {
                    handleFetchUsers();
                    successToast('User deleted!')
                } else {
                    errorToast('Something went wrong!')
                }
            })
            .catch(() => errorToast('Something went wrong!'))
    }

    const setEditingUser = (payload) => {
        setUser(payload);
        setEditOpen(true);
    }

    return (
        <>
        <h1>Users</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user, index) => (
                            <>
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="right">{user.name}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.phone}</TableCell>
                                    <TableCell align="right">{user.role}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => setEditingUser(user)}>Edit</Button>
                                        <Button onClick={() => handleConfirmationOpen(user)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            {openConfirmation && 
                                <AlertDialog 
                                    onClose={handleConfirmationClose}
                                    onConfirm={() => handleDeleteUser(user.id)}
                                    title="Confirm delete"
                                    body="Are you sure you want to delete user?"
                                />}
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {editOpen && user &&
                <EditUser
                    user={user}
                    setEditOpen={setEditOpen}
                    handleFetchUsers={handleFetchUsers}
                />
            }
        </>
    )

}

export default ListUsers;