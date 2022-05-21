import { useEffect } from "react"
import MapComponent from "../../components/MapComponent";
import { getAuth, logout } from "../../util/Utils";

export default function Home() {

    useEffect(() => {
        const auth = getAuth();
        !auth && logout();
    }, []);


    return (
        <>
            <h1>Hotel Location</h1>
            <MapComponent/>
        </>
    )
}