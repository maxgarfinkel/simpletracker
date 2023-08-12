import {useState} from 'react';
import {Button, TextField} from "@mui/material";

const Tracker = () => {

    const trackingInterval = 30*1000;

    const [id, setId] = useState("Name");
    const [tracking, setTracking] = useState();
    const [trackingIntervalId, setTrackingIntervalId] = useState();
    const [lastLocation, setLastLocation] = useState("");

    const postLocation = (user, lat, long) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, lat, long })
        };
        fetch('/.netlify/functions/save-location', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const saveLocation = () => {
        console.log("attempting to save location");
        if(navigator.geolocation) {
            console.log("has capability");
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLastLocation(`latitude: ${latitude}, longitude: ${longitude}`);
                postLocation(id, latitude, longitude);
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            }, (e) => {console.error("couldn't acquire location ", e)});
        } else {
            console.error("Tracking not supported");
        }
    }

    const setTrackingProxy = () => {

        if(!tracking) {
            setTracking(true);
            saveLocation();
            setTrackingIntervalId(setInterval(saveLocation, trackingInterval));
        } else {
            setTracking(false);
            clearInterval(trackingIntervalId)
        }
    }

    console.log("My ID:", id);

    return (
        <div>
            <header className="App-header">
                <TextField value={id} onChange={e => setId(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />

                <Button onClick={e => setTrackingProxy()}>
                    { tracking ? "Stop" : "Start" }  tracking me
                </Button>
            </header>
            <p>
                {lastLocation}
            </p>
        </div>
    );
}

export default Tracker;