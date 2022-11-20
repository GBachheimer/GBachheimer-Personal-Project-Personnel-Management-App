import "./crudCompanies.css";
import { useState, useEffect } from "react";
import Axios from "axios"

export default function CrudCompanies() {
    const [data, setData] = useState();
    const [message, setMessage] = useState();
    const [companyName, setCompanyName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [totalPositions, setTotalPositions] = useState("");
    const [openPositions, setOpenPositions] = useState("");

    useEffect(() => {
        getAllCo();
        const addressField = document.getElementById("address");
        let autocomplete = new window.google.maps.places.Autocomplete(addressField);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            console.log(place.address_components);
            setAddress(place.address_components[1].long_name + " " + place.address_components[0].long_name);
            if(place.address_components[2]) {
                setCity(place.address_components[2].long_name);
            } else {
                setCity("");
            }
            if(place.address_components[5]) {
                setCountry(place.address_components[5].long_name);
            } else {
                setCountry("");
            }
            if(place.address_components[6]) {
                setPostalCode(place.address_components[6].long_name);
            } else {
                setPostalCode("");
            }
        });
    }, []);

    const getAllCo = () => {
        Axios.get("http://localhost:5000/takeCo").then((res) => {
            setData(res.data.rows);
        });
    };

    const handleDelete = (event) => {
        Axios.delete(`http://localhost:5000/delete/${event.target.id}`).then(() => {
        console.log("test");    
        getAllCo();

        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (event) => {
        console.log("edit");
        // Axios.put(`http://localhost:5000/edit/${event.target.id}`, {

        // }).then((res) => {
        //     setMessage(res.data);
        // }).catch((error) => {
        //     setMessage(error);
        // });
    };

    const addCompany = (event) => {
        event.preventDefault();
        if (!companyName || !country || !city || !address || !totalPositions || !openPositions || !postalCode) {
            setMessage("Please fill all the fields!");
            return;
        }
        const addressToSearch = address.replace(" ", "+") + ",+" + city.replace(" ", "+") + ",+" + country.replace(" ", "+");
        Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch + "&key=AIzaSyBcyvzEq-kiLe_7471Yb6jhE32s_4-XJu0")
        .then((response) => {
            Axios.post("http://localhost:5000/addCompany", { 
                companyName: companyName,
                country: country,
                city: city,
                address: address,
                postalCode: postalCode,
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
                totalPositions: totalPositions,
                openPositions: openPositions})
            .then((res) => {
                setMessage(res.data);
                getAllCo();
            }).catch((error) => {
                console.log(error);
            })})
        .catch((error) => {
            setMessage("Coudn't take coords!");
            console.log(error);
        });
    };

    //trebuie verificat fiecare camp din adresa daca corespunde categoriei care urmeaza sa fie completata

    return (
        <div style = {{width: "100%", textAlign: "center"}}>
            <p id = "message">{message}</p>
            <div id = "addCompanyContainer" style = {{color: "white"}}>
                <label htmlFor = "companyName" className = "addCoLabel">Company Name*</label>
                <input className = "addCoInput" name = "companyName" type = "text" placeholder = "Example LLC" value = {companyName} onChange = {(event) => {setCompanyName(event.target.value)}} required></input>
                <label htmlFor = "address" className = "addCoLabel">Address*</label>
                <input className = "addCoInput" name = "address" type = "text" placeholder = "St. Peter 10" value = {address} onChange = {(event) => {setAddress(event.target.value)}} id = "address" required></input>
                <label htmlFor = "city" className = "addCoLabel">City*</label>
                <input className = "addCoInput" name = "city" type = "text" placeholder = "London" value = {city} onChange = {(event) => {setCity(event.target.value)}} required></input>
                <label htmlFor = "country" className = "addCoLabel">Country*</label>
                <select className = "addCoInput" name = "country" onChange = {(event) => {setCountry(event.target.value)}} value = {country} required>
                    <option value = ""></option>
                    <option value = "United Kingdom">United Kingdom</option>
                    <option value = "Albania">Albania</option>
                    <option value = "Andorra">Andorra</option>
                    <option value = "Austria">Austria</option>
                    <option value = "Belarus">Belarus</option>
                    <option value = "Belgium">Belgium</option>
                    <option value = "Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value = "Bulgaria">Bulgaria</option>
                    <option value = "Croatia">Croatia (Hrvatska)</option>
                    <option value = "Cyprus">Cyprus</option>
                    <option value = "Czech Republic">Czech Republic</option>
                    <option value = "France">France</option>
                    <option value = "Gibraltar">Gibraltar</option>
                    <option value = "Germany">Germany</option>
                    <option value = "Greece">Greece</option>
                    <option value = "Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                    <option value = "Hungary">Hungary</option>
                    <option value = "Italy">Italy</option>
                    <option value = "Liechtenstein">Liechtenstein</option>
                    <option value = "Luxembourg">Luxembourg</option>
                    <option value = "Macedonia">Macedonia</option>
                    <option value = "Malta">Malta</option>
                    <option value = "Moldova">Moldova</option>
                    <option value = "Monaco">Monaco</option>
                    <option value = "Montenegro">Montenegro</option>
                    <option value = "Netherlands">Netherlands</option>
                    <option value = "Poland">Poland</option>
                    <option value = "Poland">Portugal</option>
                    <option value = "Romania">Romania</option>
                    <option value = "San Marino">San Marino</option>
                    <option value = "Serbia">Serbia</option>
                    <option value = "Slovakia">Slovakia</option>
                    <option value = "Slovenia">Slovenia</option>
                    <option value = "Spain">Spain</option>
                    <option value = "Ukraine">Ukraine</option>
                    <option value = "Denmark">Denmark</option>
                    <option value = "Estonia">Estonia</option>
                    <option value = "Faroe Islands">Faroe Islands</option>
                    <option value = "Finland">Finland</option>
                    <option value = "Greenland">Greenland</option>
                    <option value = "Iceland">Iceland</option>
                    <option value = "Ireland">Ireland</option>
                    <option value = "Latvia">Latvia</option>
                    <option value = "Lithuania">Lithuania</option>
                    <option value = "Norway">Norway</option>
                    <option value = "Svalbard and Jan Mayen Islands">Svalbard and Jan Mayen Islands</option>
                    <option value = "Sweden">Sweden</option>
                    <option value = "Switzerland">Switzerland</option>
                    <option value = "Turkey">Turkey</option>
                </select>
                <label htmlFor = "postalCode" className = "addCoLabel">Postal Code*</label>
                <input className = "addCoInput" name = "postalCode" type = "text" placeholder = "10" value = {postalCode} onChange = {(event) => {setPostalCode(event.target.value)}} required></input>
                <label htmlFor = "totalPositions" className = "addCoLabel">Total Positions*</label>
                <input className = "addCoInput" name = "totalPositions" type = "text" placeholder = "329" value = {totalPositions} onChange = {(event) => {setTotalPositions(event.target.value)}} required></input>
                <label htmlFor = "openPositions" className = "addCoLabel">Open Positions*</label>
                <input className = "addCoInput" name = "openPositions" type = "text" placeholder = "23" value = {openPositions} onChange = {(event) => {setOpenPositions(event.target.value)}} required></input>
                <button id = "addCompanyBtn" className = "btn btn-primary" onClick = {addCompany}>Add Company</button>
            </div>
            <div id = "displayAllContainer">
                {data && <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Total positions</th>
                            <th>Open positions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, key) => {
                        return(
                            <tr key = {item.co_id}>
                                <td>{item.co_name}</td>
                                <td>{item.co_initial_total_positions}</td>
                                <td>{item.co_initial_free_positions}</td>
                                <td><button id = {item.co_id} onClick = {handleEdit} className = "editBtn btnStyle">Edit</button></td>
                                <td><button id = {item.co_id} onClick = {handleDelete} className = "deleteBtn btnStyle">Delete</button></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>}
                {!data && <p style = {{color: "white"}}>Loading...</p>}
            </div>
        </div>
    );
}