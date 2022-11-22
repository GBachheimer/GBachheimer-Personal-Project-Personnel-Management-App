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
    const [previousCoName, setPreviousCoName] = useState("");
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();
    const [state, setState] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllCo();
        const addressField = document.getElementById("address");
        let autocomplete = new window.google.maps.places.Autocomplete(addressField);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            console.log(place.address_components);
            let streetNr = "";
            for (let i = 0; i < place.address_components.length; ++i) {
                if(place.address_components[i].types[0] === "street_number") {
                    streetNr += place.address_components[i].long_name;
                }
                if(place.address_components[i].types[0] === "route") {
                    streetNr += " " + place.address_components[i].long_name;
                }
                if(place.address_components[i].types[0] === "locality" || place.address_components[i].types[0] === "postal_town") {
                    setCity(place.address_components[i].long_name);
                }
                if(place.address_components[i].types[0] === "administrative_area_level_1" || place.address_components[i].types[0] === "administrative_area_level_2" || place.address_components[i].types[0] === "administrative_area_level_3") {
                    setState(place.address_components[i].long_name);
                }
                if(place.address_components[i].types[0] === "country") {
                    setCountry(place.address_components[i].long_name);   
                }
                if(place.address_components[i].types[0] === "postal_code") {
                    setPostalCode(place.address_components[i].long_name);
                }
            }
            setAddress(streetNr);
        });
    }, [show]);

    const getAllCo = () => {
        Axios.get("http://localhost:5000/company/list").then((res) => {
            setData(res.data.rows);
        });
    };

    const handleDelete = (event) => {
        Axios.delete(`http://localhost:5000/company/delete/${event.target.id}`).then((res) => { 
            setMessage(res.data);
            document.getElementById("message").style.color = "#5dff6a";
            getAllCo();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (event) => {
        setEdit(true);
        setId(event.target.id);
        setMessage("");
        setShow(true);
        for(let i = 0; i < data.length; ++i) {
            if (data[i].co_id === parseInt(event.target.id)) {
                setPreviousCoName(data[i].co_name);
                setAddress(data[i].co_address);
                setCity(data[i].co_city);
                setCompanyName(data[i].co_name);
                setCountry(data[i].co_country);
                setPostalCode(data[i].co_postal_code);
                setTotalPositions(data[i].co_initial_total_positions);
                setOpenPositions(data[i].co_initial_free_positions);
                setState(data[i].co_state);
            }
        }
    };

    const editCompany = (event) => {
        event.preventDefault();
        if (!companyName || !country || !city || !address || !totalPositions || !openPositions || !postalCode || !state) {
            setMessage("Please fill all the required fields!");
            document.getElementById("message").style.color = "red";
            return;
        }
        const addressToSearch = address.replace(" ", "+") + ",+" + city.replace(" ", "+") + ",+" + state.replace(" ", "+") + ",+" + country.replace(" ", "+");
        Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch + "&key=AIzaSyDzyEPQ-8ZKu6DMZQ3lyu9T9SL4qqh5c1M")
        .then((response) => {
            Axios.put("http://localhost:5000/company/edit/" + id, { 
                companyName: companyName.replace(/\s/g, "_"),
                country: country,
                city: city,
                address: address,
                postalCode: postalCode,
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
                totalPositions: totalPositions,
                openPositions: openPositions,
                state: state,
                previousCoName: previousCoName
            }).then((res) => {
                setMessage(res.data);
                document.getElementById("message").style.color = "#5dff6a";
                setEdit(false);
                setAddress("");
                setCity("");
                setCompanyName("");
                setCountry("");
                setPostalCode("");
                setTotalPositions("");
                setOpenPositions("");
                setState("");
                setPreviousCoName("");
                getAllCo();
            }).catch((error) => {
                console.log(error);
            })})
        .catch((error) => {
            setMessage("Coudn't take coords!");
            document.getElementById("message").style.color = "red";
            console.log(error);
        });
    };

    const addCompany = (event) => {
        event.preventDefault();
        if (!companyName || !country || !city || !address || !totalPositions || !openPositions || !postalCode || !state) {
            setMessage("Please fill all the required fields!");
            document.getElementById("message").style.color = "red";
            return;
        }
        const addressToSearch = address.replace(" ", "+") + ",+" + city.replace(" ", "+") + ",+" + state.replace(" ", "+") + ",+" + country.replace(" ", "+");
        Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch + "&key=AIzaSyDzyEPQ-8ZKu6DMZQ3lyu9T9SL4qqh5c1M")
        .then((response) => {
            Axios.post("http://localhost:5000/company/add", { 
                companyName: companyName.replace(/\s/g, "_"),
                country: country,
                city: city,
                address: address,
                postalCode: postalCode,
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng,
                totalPositions: totalPositions,
                openPositions: openPositions,
                state: state
            }).then((res) => {
                setMessage(res.data);
                document.getElementById("message").style.color = "#5dff6a";
                getAllCo();
            }).catch((error) => {
                console.log(error);
            })})
        .catch((error) => {
            setMessage("Coudn't take coords!");
            document.getElementById("message").style.color = "red";
            console.log(error);
        });
    };

    const handleShowHide = () => {
        setShow(!show);
        setEdit(false);
        setAddress("");
        setCity("");
        setCompanyName("");
        setCountry("");
        setPostalCode("");
        setTotalPositions("");
        setOpenPositions("");
        setState("");
        setPreviousCoName("");
    };

    return (
        <div style = {{width: "100%", textAlign: "center"}}>
            {!show && <button className = "btn btn-primary hideShowBtn" onClick = {handleShowHide}>Add a new company</button>}
            {show && <button className = "btn btn-primary hideShowBtn" onClick = {handleShowHide}>Hide form</button>}
            {show && <div id = "addCompanyContainer" style = {{color: "white"}}>
                <label htmlFor = "companyName" className = "addCoLabel">Company Name*</label>
                <input id = "co_name" className = "addCoInput" name = "companyName" type = "text" placeholder = "Example LLC" value = {companyName} onChange = {(event) => {setCompanyName(event.target.value)}} required></input>
                <label htmlFor = "address" className = "addCoLabel">Address*</label>
                <input className = "addCoInput" name = "address" type = "text" placeholder = "St. Peter 10" value = {address} onChange = {(event) => {setAddress(event.target.value)}} id = "address" required></input>
                <label htmlFor = "city" className = "addCoLabel">City*</label>
                <input id = "co_city" className = "addCoInput" name = "city" type = "text" placeholder = "London" value = {city} onChange = {(event) => {setCity(event.target.value)}} required></input>
                <label htmlFor = "state">State / Province*</label>
                <input id = "co_state" className = "addCoInput" name = "state" type = "text" placeholder = "Ilfov" value = {state} onChange = {(event) => {setState(event.target.value)}} required></input>
                <label htmlFor = "country" className = "addCoLabel">Country*</label>
                <select id = "co_country" className = "addCoInput" name = "country" onChange = {(event) => {setCountry(event.target.value)}} value = {country} required>
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
                <input id = "co_postal_code" className = "addCoInput" name = "postalCode" type = "text" placeholder = "10" value = {postalCode} onChange = {(event) => {setPostalCode(event.target.value)}} required></input>
                <label htmlFor = "totalPositions" className = "addCoLabel">Total Positions*</label>
                <input id = "co_total_positions" className = "addCoInput" name = "totalPositions" type = "text" placeholder = "329" value = {totalPositions} onChange = {(event) => {setTotalPositions(event.target.value)}} required></input>
                <label htmlFor = "openPositions" className = "addCoLabel">Open Positions*</label>
                <input id = "co_open_positions" className = "addCoInput" name = "openPositions" type = "text" placeholder = "23" value = {openPositions} onChange = {(event) => {setOpenPositions(event.target.value)}} required></input>
                {!edit && <button id = "addCompanyBtn" className = "btn btn-primary" onClick = {addCompany}>Add Company</button>}
                {edit && <button id = "editCompanyBtn" className = "btn btn-primary" onClick = {editCompany}>Save Company Info</button>}
            </div>}
            <p id = "message">{message}</p>
            {!show && <div id = "displayAllContainer">
                {data && <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Total positions</th>
                            <th>Open positions</th>
                        </tr>
                    </thead>
                    <tbody id = "coTableBody">
                    {data.map((item, key) => {
                        return(
                            <tr key = {item.co_id}>
                                <td>{item.co_name.replace(/_/g, " ")}</td>
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
            </div>}
        </div>
    );
}