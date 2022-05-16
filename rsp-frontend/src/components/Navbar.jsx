import {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {roles, getAuth, logout} from '../util/Utils';

export default function NavBar(props) {
    const [role, setRole] = useState(null);
    const {ADMIN, WORKER, CUSTOMER} = roles;
    

    useEffect(() => {
        if (!props.noReRender) {
            const auth = getAuth(); 
            console.log(auth);
            auth && auth.role && setRole(auth.role);
        }
    },[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => window.location.href='/'}
          >
              HOTEL APP
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {
                role === ADMIN && 
                <>
                    <Button color="inherit" onClick={() => window.location.href='/users'}>Users</Button>
                    <Button color="inherit" onClick={() => window.location.href='/bills'}>Bills</Button>
                    <Button color="inherit" onClick={() => window.location.href='/hotel/reservations'}>Manage Reservations</Button>
                    <Button color="inherit" onClick={() => window.location.href='/hotel/customer-reservations'}>Customer Reservations</Button>
                    <Button color="inherit" onClick={() => window.location.href='/manage-taxis'}>Taxis</Button>
                </>
            }
            {
                role === CUSTOMER && 
                <>
                    <Button color="inherit" onClick={() => window.location.href='/cards'} >Cards</Button>
                    <Button color="inherit" onClick={() => window.location.href='/users/reservations'}>Reservations</Button>
                    <Button color="inherit" onClick={() => window.location.href='/my-reservations'}>My Reservations</Button>
                </>

            }
            {
                role === WORKER && 
                <>
                    <Button color="inherit" onClick={() => window.location.href='/bills'}>Bills</Button>
                    <Button color="inherit" >Reservations</Button>
                </>

            }
          </Typography>
            {
                role && <Button color="inherit" onClick={logout}>Logout</Button>
            }
                        
                {!role && 
                <>
                    <Button color="inherit" onClick={() => window.location.href='/login'}>Login</Button>
                    <Button color="inherit" onClick={() => window.location.href='/signup'}>Signup</Button>
                </>

            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}