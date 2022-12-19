
import { useState, useEffect } from "react";
import Axios from "axios";
import CompanyCard from "./companyCard";
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import HideSourceIcon from '@mui/icons-material/HideSource';
import { Button, Grid, Autocomplete, TextField, Grow, Zoom } from "@mui/material";
import AddCompanyForm from "./addCompanyForm";
import SnackbarTemplate from "../../components/snackbarTemplate";

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
    const [companyInfo, setCompanyInfo] = useState();
    const [open, setOpen] = useState();
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [growAnim, setGrowAnim] = useState(true);
    const [severity, setSeverity] = useState("info");

    useEffect(() => {
        getAllCo();
    }, [value]);

    useEffect(() => {
        getAllCo();
        if (show) {
        const addressField = document.getElementById("outlined-input-address");
        let autocomplete = new window.google.maps.places.Autocomplete(addressField);
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
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
        })} else {
            return;
        }
    }, [show]);

    const getAllCo = () => {
        setData();
        Axios.get("http://localhost:5000/company/list").then((res) => {
            setData(res.data.rows);
            if(!value) {
                setValue(res.data.rows[0].co_name);
                setCompanyInfo(res.data.rows[0]);
            } else {
                for(let i = 0; i < res.data.rows.length; ++i) {
                    if(res.data.rows[i].co_name === value) {
                        setCompanyInfo(res.data.rows[i]);
                    }
                }
            };
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleSnackBar = () => {
        setOpen(false);
    };

    const handleCompanyName = (event) => {
        setCompanyName(event.target.value);
        console.log(companyName);
    };

    const handleCompanyAddress = (event) => {
        setAddress(event.target.value);
        console.log(address);
    };

    const handleCompanyCity = (event) => {
        setCity(event.target.value);
        console.log(city);
    };

    const handleCompanyState = (event) => {
        setState(event.target.value);
        console.log(state);
    };

    const handleCompanyCountry = (event) => {
        setCountry(event.target.textContent);
        console.log(event.target.textContent);
    };

    const handleCompanyPostalCode = (event) => {
        setPostalCode(event.target.value);
        console.log(postalCode);
    };

    const handleCompanyTotalPositions = (event) => {
        setTotalPositions(event.target.value);
        console.log(totalPositions);
    };

    const handleCompanyOpenPositions = (event) => {
        setOpenPositions(event.target.value);
        console.log(openPositions);
    };

    const handleDelete = (event) => {
        Axios.delete(`http://localhost:5000/company/delete/${event.target.id}`).then((res) => {
            setMessage(res.data);
            setSeverity("success");
            setOpen(true);
            setValue(data[0].co_name);
            setCompanyInfo(data[0]);
            getAllCo();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (event) => {
        setEdit(true);
        setId(event.target.id);
        determineShowHide();
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
        if (companyName === "" || country === "" || city === "" || address === "" || totalPositions === "" || openPositions === "" || postalCode === "" || state === "") {
            setMessage("Please fill all the required fields!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        const addressToSearch = address.replace(" ", "+") + ",+" + city.replace(" ", "+") + ",+" + state.replace(" ", "+") + ",+" + country.replace(" ", "+");
        Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch + "&key=" + process.env.REACT_APP_MY_API_KEY)
        .then((response) => {
            Axios.put("http://localhost:5000/company/edit/" + id, { 
                companyName: companyName,
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
                setValue(companyName);
                reset();
                determineShowHide();
                getAllCo();
                setSeverity("success");
                setOpen(true);
            }).catch((error) => {
                console.log(error);
            })})
        .catch((error) => {
            setMessage("Coudn't take coords!");
            setSeverity("error");
            setOpen(true);
            console.log(error);
        });
    };

    const addCompany = (event) => {
        event.preventDefault();
        if (companyName === "" || country === "" || city === "" || address === "" || totalPositions === "" || openPositions === "" || postalCode === "" || state === "") {
            setMessage("Please fill all the required fields!");
            setSeverity("error");
            setOpen(true);
            return;
        };
        const addressToSearch = address.replace(" ", "+") + ",+" + city.replace(" ", "+") + ",+" + state.replace(" ", "+") + ",+" + country.replace(" ", "+");
        Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressToSearch + "&key=" +   process.env.REACT_APP_MY_API_KEY)
        .then((response) => {
            Axios.post("http://localhost:5000/company/add", { 
                companyName: companyName,
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
                setSeverity("success");
                setOpen(true);
                determineShowHide();
                getAllCo();
            }).catch((error) => {
                console.log(error);
            })})
        .catch((error) => {
            setMessage("Coudn't take coords!");
            setSeverity("error");
            setOpen(true);
            console.log(error);
        });
    };

    const reset = () => {
        setAddress("");
        setCity("");
        setCompanyName("");
        setCountry("");
        setPostalCode("");
        setTotalPositions("");
        setOpenPositions("");
        setState("");
        setPreviousCoName("");
        setEdit(false);
    };

    const determineShowHide = () => {
        setGrowAnim(!growAnim);
        setTimeout(() => {
            setShow(!show);
        }, 100);
    };

    const handleShowHide = () => {
        determineShowHide();
        reset();
    };

    return (
        <Grid container sx = {{textAlign: "center"}}>
            {!show && 
                <Grow in = {growAnim}>
                    <Grid item xs = {12}>
                        <Button variant = "contained" startIcon = {<DomainAddIcon />} onClick = {handleShowHide} sx = {{marginTop: "2%"}}>
                            Add a new company
                        </Button>
                    </Grid>
                </Grow>}
            {show && 
                <Grow in = {!growAnim} style={{ transitionDelay: !growAnim ? '100ms' : '0ms' }}>
                    <Grid item xs = {12}>
                        <Button variant = "outlined" startIcon = {<HideSourceIcon />} onClick = {handleShowHide} sx = {{marginTop: "2%"}}>
                            Hide form
                        </Button>
                    </Grid>
                </Grow>}
            {show && 
                <AddCompanyForm
                    addCompany = {addCompany}
                    editCompany = {editCompany}
                    companyName = {companyName}
                    handleCompanyName = {handleCompanyName}
                    address = {address}
                    handleCompanyAddress = {handleCompanyAddress}
                    city = {city}
                    handleCompanyCity = {handleCompanyCity}
                    state = {state}
                    handleCompanyState = {handleCompanyState}
                    country = {country}
                    handleCompanyCountry = {handleCompanyCountry}
                    postalCode = {postalCode}
                    handleCompanyPostalCode = {handleCompanyPostalCode}
                    totalPositions = {totalPositions}
                    handleCompanyTotalPositions = {handleCompanyTotalPositions}
                    openPositions = {openPositions}
                    handleCompanyOpenPositions = {handleCompanyOpenPositions}
                    edit = {edit}
                    show = {show}
                    growAnim = {growAnim}
                />}
            {data && !show && 
                <Zoom in={growAnim} style={{ transitionDelay: growAnim ? '100ms' : '0ms' }}>
                    <Grid item xs = {10} md = {8} sx = {{margin: "auto", marginTop: "2%"}}>
                        <Autocomplete
                            value = {value}
                            onChange = {(event, newValue) => {
                                setValue(newValue);
                                for(let i = 0; i < data.length; ++i) {
                                    if(data[i].co_name === newValue) {
                                        setCompanyInfo(data[i]);
                                    }
                                };
                            }}
                            inputValue = {inputValue}
                            onInputChange = {(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id = "controllable-states-demo"
                            options = {data.map((company) => {
                                return company.co_name;
                            })}
                            renderInput = {(params) => <TextField {...params} label="Company" />}
                        />
                    </Grid>
                </Zoom>}
            {companyInfo && !show && 
                <Zoom in={growAnim} style={{ transitionDelay: growAnim ? '250ms' : '0ms' }}>
                    <Grid item xs = {10} md = {8} sx = {{margin: "auto"}}>
                        <CompanyCard company = {companyInfo} handleEdit = {handleEdit} handleDelete ={handleDelete}></CompanyCard>
                    </Grid>
                </Zoom>}
            <SnackbarTemplate severity = {severity} handleSnackBar = {handleSnackBar} open = {open} message = {message} />
        </Grid>
    );
}