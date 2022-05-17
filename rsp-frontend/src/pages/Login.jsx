import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { login } from "../api/userServiceApi";
import { errorToast } from "../helper/helper";
import { Toaster } from 'react-hot-toast';

const Login = () => {
    const [credentials, setCredentials] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(credentials)
            .then(res => {
                console.log(res)
                if(res.data) {
                    localStorage.setItem('authentication', res.data.accessToken);
                    window.location.href='/';
                } else {
                    errorToast('Login failed!')
                }
            })
            .catch(err => errorToast('Login failed!'));

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email': {
                setCredentials({ ...credentials, email: value });
                break;
            }
            case 'password': {
                setCredentials({ ...credentials, password: value });
                break;
            }
            default: { }
        }
    }

    return (
        <>
            <Toaster/>
            <Grid container my={2}
                direction="row"
            >
                <Grid item xs={0} md={4}></Grid>
                <Grid item sx={{ boxShadow: 1 }} px={3} py={3} xs={12} md={4}>
                    <center>
                        <h1>Login</h1>
                    </center>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email address"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        name="password"
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <center>
                        <Button onClick={handleSubmit}>Sign in</Button>
                    </center>
                </Grid>
                <Grid item xs={0} md={4}></Grid>
            </Grid>
        </>
    );
}

export default Login;