import {useState} from 'react';
import {Button, TextField} from "@mui/material";

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