import { Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapsInfo from "../components/googleMaps";
import Axios from "axios";
import { useState, useEffect } from "react";

export default function Overview() {
    const [allCoData, setAllCoData] = useState();
    const centerEurope = { lat: 50.0755, lng: 14.4378 };
    const zoomEurope = 4;

    useEffect(() => {
        Axios.get("http://localhost:5000/takeCo").then((res) => {
            setAllCoData(res.data.rows);
        });
    }, []);

    return (
        <div style = {{ display: "flex", height: "90vh", width: "100%" }}>
            {allCoData && <Wrapper apiKey = "MY_KEY" >
                <GoogleMapsInfo center = {centerEurope} zoom = {zoomEurope} data = {allCoData} />
            </Wrapper>}
            {!allCoData && <h1 style = {{color: "black"}} className = "position-absolute start-50 top-50 translate-middle">Loading...</h1>}
        </div>
    );
}