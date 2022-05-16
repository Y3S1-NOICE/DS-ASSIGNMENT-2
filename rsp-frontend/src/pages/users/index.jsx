import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CreateUser from './CreateUser';
import ListUsers from './ListUsers';


const Users = () => {
    return (
            <Box>
                <Grid container
                    spacing={5}
                    direction="row"
                >
                    <Grid item xs={12} md={8} >
                    <Box px={2} sx={{ boxShadow: 1 }} >
                        <ListUsers />
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box px={2} sx={{ boxShadow: 1 }} >
                            <CreateUser />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
    )
}

export default Users;