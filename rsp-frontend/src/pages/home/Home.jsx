import { useEffect, useState } from "react"

import { getAuth, logout } from "../../util/Utils";
import TextField from '@mui/material/TextField';
import { getAllReservations } from "../../api/reservatiosHotelApi";
import Autocomplete from '@mui/material/Autocomplete';
import { createMap, updateMap } from "../../api/mapService";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CreateMap from "./CreateMap";
import GetMap from "./GetMap";

export default function Home() {
    const [role, setRole] = useState();
    useEffect(() => {
        const auth = getAuth();
        !auth && logout();
        setRole(auth.role);
    }, []);


    return (
        <>
            <Box>
                <Grid container
                    spacing={5}
                    direction="row"
                >
                    <Grid item xs={12} md={8} >
                        <Box px={2} >
                            <GetMap />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box px={2} >
                            {role && role === 'SystemAdmin' &&
                                <CreateMap />
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>



        </>
    )
}