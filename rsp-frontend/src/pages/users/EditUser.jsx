import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateUser } from '../../api/userServiceApi';
import { errorToast, successToast } from "../../helper/helper";

const EditUser = (props) =>{
    const [user, setUser] = useState(props.user);

    const handleEditUser = () => {
        updateUser(user.id, user)
            .then((res) => {
                if(res.data) {
                    props.handleFetchUsers();
                    successToast("User updated!") 
                } else {
                    errorToast("Something went wrong!");
                }
                props.setEditOpen(false)
            })
            .catch(() => errorToast("Something went wrong!"));
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'name': {
                setUser({...user, name: value});
                break;
            }
            case 'email': {
                setUser({...user, email: value});
                break;
            }
            case 'password': {
                setUser({...user, password: value});
                break;
            }
            case 'phone': {
                setUser({...user, phone: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Dialog open={true} onClose={() => props.setEditOpen(false)}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    value={user.name}
                    label="User's name"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="email"
                    label="User's email"
                    value={user.email}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="phone"
                    label="User's phone"
                    value={user.phone}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                {/* <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    label="User's password"
                    value={user.password}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                /> */}
                <br />
                <br />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Edit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default EditUser;