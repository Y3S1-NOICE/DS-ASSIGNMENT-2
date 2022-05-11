import { useEffect } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import MapComponent from "../../components/MapComponent";

export default function Home() {

    useEffect(() => {

    }, []);


    return (
        <>
            <h1>Hotel Location</h1>
            <MapComponent/>
        </>
    )
}