import {useState} from 'react';
import {Button, TextField} from "@mui/material";
import Map, {Marker} from 'react-map-gl';

const Mapper = () => {
    const [user, setUser] = useState("");
    const [locations, setLocations] = useState([]);

    const getUserTrail = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user })
        };
        fetch('/.netlify/functions/get-location', requestOptions)
            .then(response => {
                if(response.status === 200) {
                    return response.json()
                } else {
                    return []
                }
            }).then(data => {
                setLocations(data.locations);
            });
    }

    return (
        <>
            <TextField value={user} onChange={e => setUser(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />

            <Button onClick={e => getUserTrail()}>
                Get user trail
            </Button>
            { locations && locations.length > 0 &&
                <div>

                    <div>
                        <Map
                            mapLib={import('mapbox-gl')}
                            initialViewState={{
                                longitude: locations[0].long,
                                latitude: locations[0].lat,
                                zoom: 10
                            }}
                            style={{width: '90vw', height: '90vh'}}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        >
                            <Marker longitude={locations[0].long} latitude={locations[0].lat} color="red"  />
                        </Map>
                    </div>

                {locations.map((location, i) => {
                    return(<div key={location.timestamp + i}>
                        latitude: {location.lat},
                        longitude: {location.long},
                    </div>)})
                }
                </div>
            }
        </>
    );
}

export default Mapper;