import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { handleError } from "../helper/helper";
import { createUser, login } from "../api/userServiceApi";

const Signup = () => {
    const [user, setUser] = useState({});

    const handleLogin = () => {
        login({email: user.email, password: user.password}).then(res => {
                console.log(res)
                if(res.data) {
                    localStorage.setItem('authentication', res.data.accessToken);
                    window.location.href='/';
                } else {
                    alert('Authentication Failed!')
                }
            })
            .catch(err => alert('Authentication Failed!'));

    }

    const handleSubmit = () => {
        user.role = 'Customer';

        createUser(user)
            .then(res => {
                res.data ?
                    handleLogin() :
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
            <Grid container my={2}
                direction="row"
            >
                <Grid item xs={0} md={3}></Grid>
                <Grid item sx={{ boxShadow: 1 }} px={3} py={3} xs={12} md={6}>
                    <center><h1>Sign Up</h1></center>
                    <TextField
                        style ={{minWidth: '400px'}}
                        autoFocus
                        margin="dense"
                        name="id"
                        label="NIC"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        style ={{minWidth: '400px'}}
                        margin="dense"
                        name="name"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        style ={{minWidth: '400px'}}
                        margin="dense"
                        name="email"
                        label="Email"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        style ={{minWidth: '400px'}}
                        margin="dense"
                        name="phone"
                        label="Phone"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        style ={{minWidth: '400px'}}
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        value={user.password}
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        />
                <center><Button onClick={handleSubmit}>Sign Up</Button></center>
                </Grid>
                <Grid item xs={0} md={3} ></Grid>
            </Grid> 
        </>
    );
}

export default Signup;