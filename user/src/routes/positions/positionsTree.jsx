import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router";
import PositionsCard from "./positionsCard";
import SnackbarTemplate from "../../components/snackbarTemplate";
import { Grid, Button, Box, LinearProgress, Typography, Autocomplete, TextField, CircularProgress, Collapse, Zoom } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import AddNewPositionForm from "./addNewPositionForm";
import AddIcon from '@mui/icons-material/Add';
import HideSourceIcon from '@mui/icons-material/HideSource';
import background from "../resources/pickingman_background.png";

export default function PositionsTree() {
    const [data, setData] = useState();
    const [coName, setCoName] = useState("");
    const [positions, setPositions] = useState();
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(new Date().toLocaleDateString());
    const [message, setMessage] = useState("");
    const [posLink, setPosLink] = useState("");
    const [progress, setProgress] = useState();
    const [occupied, setOccupied] = useState("No");
    const [showAddForm, setShowAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();
    const [coId, setCoId] = useState();
    const [animate, setAnimate] = useState(true);
    let totalOccupiedPositions = 0;
    const location = useLocation();
    const [open, setOpen] = useState();
    const [severity, setSeverity] = useState("info");

    const handleSnackBar = () => {
        setOpen(false);
    };

    const handlePositionName = (event) => {
        setPosition(event.target.value);
    };

    const handleLinkToJob = (event) => {
        setPosLink(event.target.value);
    };

    const handleDetails = (event) => {
        setDescription(event.target.value);
    };

    const handleDeadline = (newValue) => {
        setDeadline(newValue);
    };

    const handleOccupied = (event) => {
        setOccupied(event.target.value);
    };

    useEffect(() => {
        Axios.get("http://localhost:5000/company/list").then((res) => {
            setData(res.data.rows);
            if(location.state) {
                setCoName(location.state[0]);
                setCoId(location.state[1]);
            } else {
                setCoName(res.data.rows[0].co_name);
                setCoId(res.data.rows[0].co_id);
            };
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (coId) {
            getAllPositions();
        }
    }, [coId]);

    const getAllPositions = () => {
        Axios.get("http://localhost:5000/positions/list/" + coId).then((res) => {
            setPositions(res.data.rows);
            setId(res.data.rows[0].pos_id);
            totalOccupiedPositions = 0;
            for(let i = 0; i < res.data.rows.length; ++i) {
                if(res.data.rows[i].pos_occupied === "Yes") {
                    ++totalOccupiedPositions;
                }
            };
            setProgress(parseInt(totalOccupiedPositions * 100 / res.data.rows.length));
        }).catch((error) => {
            setPositions();
            console.log(error);
        });
    };

    const handleAddPosition = () => {
        if(!position) {
            setMessage("Please write the name of position!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        if(!data) {
            setMessage("No data available. Please try again later!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        for(let i = 0; i < data.length && positions; ++i) {
            if(data[i].co_name === coName && positions.length >= data[i].co_initial_free_positions) {
                setMessage("Failed! Maximum open positions reached.");
                setSeverity("warning");
                setOpen(true);
                return;
            }
        };
        Axios.post("http://localhost:5000/positions/add/" + coId, {
            position: position,
            description: description,
            deadline: deadline,
            link: posLink,
            occupied: occupied
        }).then((res) => {
            determineShowHide();
            setMessage(res.data);
            setSeverity("success");
            setOpen(true);
            getAllPositions();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (event) => {
        setEdit(true);
        setId(event.target.id);
        console.log(id);
        determineShowHide();
        for(let i = 0; i < positions.length; ++i) {
            if(positions[i].pos_id === parseInt(event.target.id)) {
                setPosition(positions[i].pos_name);
                if(positions[i].pos_description) {
                    setDescription(positions[i].pos_description);
                }
                if(positions[i].pos_deadline) {
                    setDeadline(positions[i].pos_deadline);
                }
                if(positions[i].pos_link) {
                    setPosLink(positions[i].pos_link);
                }
                if(positions[i].pos_occupied) {
                    setOccupied(positions[i].pos_occupied);
                }
            }
        };
    };

    const handleSaveEdit = (event) => {
        Axios.put("http://localhost:5000/positions/edit/" + id, {
            position: position,
            description: description,
            deadline: deadline,
            link: posLink,
            occupied: occupied
        }).then((res) => {
            setMessage(res.data);
            setSeverity("success");
            setOpen(true);
            getAllPositions();
            determineShowHide();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDelete = (event) => {
        Axios.delete("http://localhost:5000/positions/delete/" + event.target.id).then((res) => {
            setMessage(res.data);
            setSeverity("success");
            setOpen(true);
            resetStates();
            getAllPositions();
        }).catch((error) => {
            console.log(error);
        });
    };

    const resetStates = () => {
        setEdit(false);
        setPosition("");
        setDescription("");
        setDeadline("");
        setPosLink("");
        setOccupied("No");
    };
    
    const determineShowHide = () => {
        setAnimate(!animate);
        setTimeout(() => {
            setShowAddForm(!showAddForm);
        }, 200);
    };
    
    const handleShowHide = () => {
        determineShowHide();
        resetStates();
    };

    return(
        <Grid container sx = {{textAlign: "center"}}>
            {!showAddForm && <Grid item xs = {12}>
                <Zoom in = {animate}>
                    <img src = {background} width = "300px" style = {{marginTop: "2%"}}></img>
                </Zoom>
            </Grid>}
            {!showAddForm && 
                <Zoom in = {animate} style={{ transitionDelay: animate ? '100ms' : '0ms' }}>
                    <Grid item xs = {12}>
                        <Button startIcon = {<AddIcon />} variant = "contained" onClick = {handleShowHide} sx = {{marginTop: "2%"}}>
                            Add position
                        </Button>
                    </Grid>
                </Zoom>}
            {!showAddForm && 
                <Grid item xs = {10} md = {8} sx = {{margin: "auto", marginTop: "2%"}}>
                    {positions && data && <Box>
                        <Zoom in = {animate} style={{ transitionDelay: animate ? '200ms' : '0ms' }}>
                            <Autocomplete
                                value = {coName}
                                onChange = {(event, newValue) => {
                                    setCoName(newValue);
                                    for(let i = 0; i < data.length; ++i) {
                                        if(data[i].co_name === newValue) {
                                            setCoId(data[i].co_id);
                                        }
                                    };
                                }}
                                id = "controllable-states-demo"
                                options = {data.map((company) => {
                                    return company.co_name;
                                })}
                                renderInput = {(params) => <TextField {...params} label = "Company"/>}
                            />
                        </Zoom>
                        <Zoom in = {animate} style={{ transitionDelay: animate ? '300ms' : '0ms' }}>
                            <Box sx = {{ display: 'flex', alignItems: 'center', margin: "auto", marginTop: "2%", marginBottom: "2%"}}>
                                <Box sx = {{ width: '100%', mr: 1 }}>
                                    <LinearProgress  variant="determinate" value = {progress}/>
                                </Box>
                                <Box sx = {{ minWidth: 35 }}>
                                    <Typography variant = "body2" color = "text.secondary">
                                        {`${Math.round(progress)}%`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Zoom>
                        {positions && 
                            <TransitionGroup>
                                {positions.map((position, id) => {
                                    return (
                                        <Collapse key = {id}>
                                            <PositionsCard animate = {animate} position = {position} handleEdit = {handleEdit} handleDelete = {handleDelete}></PositionsCard>
                                        </Collapse>
                                    );
                                })}
                            </TransitionGroup>}
                    </Box>}
                </Grid>}
            {showAddForm && 
                <Grid item xs = {10} md = {8} sx = {{margin: "auto"}}>
                    <Zoom in = {!animate}>
                        <Button startIcon = {<HideSourceIcon />} variant = "outlined" onClick = {handleShowHide} sx = {{marginTop: "2%"}}>
                            Hide form
                        </Button>
                    </Zoom>
                    <AddNewPositionForm 
                        edit = {edit}
                        position = {position}
                        handlePositionName = {handlePositionName}
                        posLink = {posLink}
                        handleLinkToJob = {handleLinkToJob}
                        description = {description}
                        handleDetails = {handleDetails}
                        deadline = {deadline}
                        handleDeadline = {handleDeadline}
                        occupied = {occupied}
                        handleOccupied = {handleOccupied}
                        handleAddPosition = {handleAddPosition}
                        handleSaveEdit = {handleSaveEdit}
                        coName = {coName}
                        animate = {animate}
                        posId = {id}
                    />
                </Grid>}
            {!data && 
                <Grid item xs = {12} sx = {{margin: "auto"}}>
                    <CircularProgress color = "success" />
                </Grid>}
            <SnackbarTemplate severity = {severity} handleSnackBar = {handleSnackBar} open = {open} message = {message} />
        </Grid>
    );
}