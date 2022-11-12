import { useState } from "react";
import "./addCompany.css";

export default function AddCompany() {
    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [totalPositions, setTotalPositions] = useState("");
    const [openPositions, setOpenPositions] = useState("");

    const addCompany = () => {
        console.log("added");
    };

    return (
        <div id = "addCompanyContainer" className = "position-absolute top-50 start-50 translate-middle" style = {{color: "white"}}>
            <lable htmlfor = "companyName">Company Name:</lable>
            <input name = "companyName" type = "text" placeholder = "Example LLC" value = {companyName} onCahnge = {(event) => {setCompanyName(event.target.value)}} required></input>
            <lable htmlfor = "country">Country:</lable>
            <input name = "country" type = "text" placeholder = "UK" value = {country} onCahnge = {(event) => {setCountry(event.target.value)}} required></input>
            <lable htmlfor = "city">City:</lable>
            <input name = "city" type = "text" placeholder = "London" value = {city} onCahnge = {(event) => {setCity(event.target.value)}} required></input>
            <lable htmlfor = "street">Street:</lable>
            <input name = "street" type = "text" placeholder = "St. Peter" value = {street} onCahnge = {(event) => {setStreet(event.target.value)}} required></input>
            <lable htmlfor = "number">Number:</lable>
            <input name = "number" type = "text" placeholder = "10" value = {number} onCahnge = {(event) => {setNumber(event.target.value)}} required></input>
            <lable htmlfor = "totalPositions">Total Positions:</lable>
            <input name = "totalPositions" type = "text" placeholder = "329" value = {totalPositions} onCahnge = {(event) => {setTotalPositions(event.target.value)}} required></input>
            <lable htmlfor = "openPositions">Open Positions:</lable>
            <input name = "openPositions" type = "text" placeholder = "23" value = {openPositions} onCahnge = {(event) => {setOpenPositions(event.target.value)}} required></input>
            <button id = "addCompanyBtn" className = "btn btn-primary" onClick = {addCompany}>Add Company</button>
        </div>
    );
}