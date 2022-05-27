import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { handleError } from "../helper/helper";
import { createUser, login } from "../api/userServiceApi";

const Signup = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({
        id: false,
        name: false,
        email: false,
        phone: false,
        password: false,
        containsErrors: true
    });

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

    const validateForm = () => {
        let errors_ = {
            id: false,
            name: false,
            email: false,
            phone: false,
            password: false,
            containsErrors: true
        }

        if (!user.id || user.id === '') (errors_.id = true);
        if (!user.name || (/\d/.test(user.name))) (errors_.name = true);
        if (!user.email ) (errors_.email = true);
        if (!user.phone || !(/^\d+$/.test(user.phone))) (errors_.phone = true);
        if (!user.password) (errors_.password = true);
        setErrors(errors_)

        console.log(errors)
        if (errors_.id || errors_.name || errors_.email || errors_.phone ||errors_.password) return false;
        return true;
    }

    const handleSubmit = () => {
        user.role = 'Customer';
        let hasErrors = validateForm();
        console.log(hasErrors,errors )
        if(hasErrors) {
            createUser(user)
            .then(res => {
                res.data ?
                    handleLogin() :
                    handleError()
            })
            .catch(() => handleError())
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id': {
                setUser({ ...user, id: value });
                setErrors({...errors, id: false});
                break;
            }
            case 'name': {
                setUser({ ...user, name: value });
                setErrors({...errors, name: false});
                break;
            }
            case 'email': {
                setUser({ ...user, email: value });
                setErrors({...errors, email: false});
                break;
            }
            case 'password': {
                setUser({ ...user, password: value });
                setErrors({...errors, password: false});
                break;
            }
            case 'role': {
                setUser({ ...user, role: value });
                break;
            }
            case 'phone': {
                setUser({ ...user, phone: value });
                setErrors({...errors, phone: false});
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
                        error={errors.id}
                        helperText={errors.id && 'Invalid id'}
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
                        error={errors.name}
                        helperText={errors.name && 'Invalid name'}
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
                        error={errors.email}
                        helperText={errors.email && 'Invalid email'}
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
                        error={errors.phone}
                        helperText={errors.phone && 'Invalid phone'}
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
                        error={errors.password}
                        helperText={errors.email && 'Invalid password'}
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