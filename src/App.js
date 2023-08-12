import './App.css';
import {Button, TextField} from "@mui/material";
import {useState} from "react";

function App() {

    const trackingInterval = 30*1000;

    const [id, setId] = useState("Name");
    const [tracking, setTracking] = useState();
    const [trackingIntervalId, setTrackingIntervalId] = useState();

    const saveLocation = () => {
        console.log("attempting to save location");
        if(navigator.geolocation) {
            console.log("has capability");
            navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
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
    <div className="App">
      <header className="App-header">
          <TextField value={id} onChange={e => setId(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />

          <Button onClick={e => setTrackingProxy()}>
              { tracking ? "Stop" : "Start" }  tracking me
          </Button>
      </header>
    </div>
  );
}

export default App;
