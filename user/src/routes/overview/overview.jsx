import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapsInfo from "./googleMaps/googleMaps";
import Axios from "axios";
import { useState, useEffect } from "react";

export default function Overview() {
    const [allCoData, setAllCoData] = useState();
    const centerEurope = { lat: 50.0755, lng: 14.4378 };
    const zoomEurope = 4;

    useEffect(() => {
        Axios.get("http://localhost:5000/company/list").then((res) => {
            setAllCoData(res.data.rows);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div style = {{height: "100vh", width: "100%" }}>
            {allCoData && <Wrapper apiKey = "AIzaSyAHYK2pVUawgmxttE5aOquGNSFebnbWv_w" >
                <GoogleMapsInfo center = {centerEurope} zoom = {zoomEurope} data = {allCoData} />
            </Wrapper>}
            {!allCoData && <div className = "spinner-grow text-warning position-absolute start-50 top-50 translate-middle" role = "status">
                    <span className = "visually-hidden">Loading...</span>
            </div>}
        </div>
    );
}