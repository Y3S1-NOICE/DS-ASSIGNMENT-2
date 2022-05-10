import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createUser } from '../../api/userServiceApi';
import { handleError } from '../../helper/helper';

const CreateUser = () => {
    const [user, setUser] = useState({});

    const handleSubmit = () => {
        createUser(user)
            .then(res => {
                res.data ?
                    console.log(res.data) :
                    handleError()
            })
            .catch(() => handleError())
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id': {
                setUser({ ...user, id: value });
                break;
            }
            case 'name': {
                setUser({ ...user, name: value });
                break;
            }
            case 'email': {
                setUser({ ...user, email: value });
                break;
            }
            case 'password': {
                setUser({ ...user, password: value });
                break;
            }
            case 'role': {
                setUser({ ...user, role: value });
                break;
            }
            case 'phone': {
                setUser({ ...user, phone: value });
                break;
            }
            default: { }
        }
    }

    return (
        <>
            <h1>Create new User</h1>
            <TextField
                autoFocus
                margin="dense"
                name="id"
                label="User's ID"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="name"
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
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="phone"
                label="User's phone"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="role"
                label="User's role"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    label="User's password"
                    type="password"
                    value={user.password}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
            <br />
            <Button onClick={handleSubmit}>Create User</Button>
        </>
    );
}

export default CreateUser;