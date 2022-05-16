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
            <Grid container
                sx={{ boxShadow: 3 }}
                spacing={0}
                direction="column"
                alignItems="center"
            >
                <h1>SIGN UP</h1>
                <Grid item xs={12} md={12}>
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
                </Grid>
                <Grid item xs={12} md={12}>
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
                </Grid>
                <Grid item xs={12} md={12}>
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
                </Grid>
                <Grid item xs={12} md={12}>
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
                </Grid>
                <Grid item xs={12} md={12}>
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
                </Grid>
                <Button onClick={handleSubmit}>Sign Up</Button>
            </Grid>
        </>
    );
}

export default Signup;