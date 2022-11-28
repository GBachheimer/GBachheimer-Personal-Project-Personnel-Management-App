import { useState, useEffect } from "react";
import Axios from "axios";
import "./positionsTree.css";
import { useLocation } from "react-router";
import PositionsCard from "./positionsCard";
import myVideo from "../companies/best.mp4";

export default function PositionsTree() {
    const [data, setData] = useState();
    const [coName, setCoName] = useState("");
    const [positions, setPositions] = useState();
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [message, setMessage] = useState("");
    const [posLink, setPosLink] = useState("");
    const [progress, setProgress] = useState();
    const [occupied, setOccupied] = useState("No");
    const [showAddForm, setShowAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();
    const [coId, setCoId] = useState();
    const [animate, setAnimate] = useState(false);
    let totalOccupiedPositions = 0;
    const location = useLocation();

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
            setMessage("");
        }
    }, [coName, coId]);

    const getAllPositions = () => {
        setPosition();
        Axios.get("http://localhost:5000/positions/list/" + coId).then((res) => {
            setPositions(res.data.rows);
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
            document.getElementById("message").style.color = "red";
            setMessage("Please write the name of position!");
            return;
        }
        if(!data) {
            console.log("no data");
            document.getElementById("message").style.color = "red";
            setMessage("No data available. Please try again later!");
            return;
        }
        for(let i = 0; i < data.length && positions; ++i) {
            if(data[i].co_name === coName && positions.length >= data[i].co_initial_free_positions) {
                document.getElementById("message").style.color = "red";
                setMessage("Failed! Maximum open positions reached.");
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
            document.getElementById("message").style.color = "#007f0b";
            determineShowHide();
            setMessage(res.data);
            getAllPositions();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (event) => {
        setEdit(true);
        setId(event.target.id);
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
            document.getElementById("message").style.color = "#007f0b";
            setMessage(res.data);
            getAllPositions();
            determineShowHide();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDelete = (event) => {
        Axios.delete("http://localhost:5000/positions/delete/" + event.target.id).then((res) => {
            document.getElementById("message").style.color = "#007f0b";
            setMessage(res.data);
            resetStates();
            getAllPositions();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleShowHide = () => {
        determineShowHide();
        resetStates();
        setMessage("");
    };

    const resetStates = () => {
        setEdit(false);
        setPosition("");
        setDescription("");
        setDeadline("");
        setPosLink("");
        setOccupied("No");
        setMessage("");
    };

    const handleSelectChange = (event) => {
        setCoName(event.target.value);
        for (let i = 0; i < data.length; ++i) {
            if (data[i].co_name === event.target.value) {
                setCoId(data[i].co_id);
            }
        };
    };

    const determineShowHide = () => {
        if(!showAddForm) {
            setTimeout(() => {setShowAddForm(true)}, 200);
            setAnimate(true);
        } else {
            setTimeout(() => {setShowAddForm(!showAddForm)}, 200);
            setAnimate(false);
        };
    };

    return(
        <div className = "treeContainer" style = {{color: "white"}}>
            {!showAddForm && <button onClick = {handleShowHide} className = "btn btn-light showFormBtn">Add a new position to this Company</button>}
            {showAddForm && <button onClick = {handleShowHide} className = "btn btn-light showFormBtn">Hide form</button>}
            <p id = "message">{message}</p>
            {showAddForm && <div id = "addPosContainer" className = {animate ? "grow" : "shrink"}>
                <label className = "addPositionLabel" htmlFor = "positionName">Open Position Name*:</label>
                <input className = "addPositionInput" type = "text" value = {position} onChange = {event => setPosition(event.target.value)} required></input>
                <label className = "addPositionLabel" htmlFor = "link">Link to job description:</label>
                <input className = "addPositionInput" name = "link" type = "text" value = {posLink} onChange = {event => setPosLink(event.target.value)} required></input>
                <label className = "addPositionLabel" htmlFor = "description">Other details:</label>
                <textarea className = "addPositionInput" name = "description" onChange = {event => setDescription(event.target.value)} value = {description}></textarea>
                <label className = "addPositionLabel" htmlFor = "" >Choose a deadline:</label>
                <input className = "addPositionInput" type = "date" value = {deadline} onChange = {event => setDeadline(event.target.value)}></input>
                {edit && <label className = "addPositionLabel" htmlFor = "occupied">Position is now occupied?</label>}
                {edit && <select className = "addPositionInput" name = "occupied" value = {occupied} onChange = {event => setOccupied(event.target.value)}>
                    <option value = "No">No</option>
                    <option value = "Yes">Yes</option>
                </select>}
                {!edit && <button className = "btn btn-light addPosBtn" onClick = {handleAddPosition}>Add position to {coName}</button>}
                {edit && <button className = "btn btn-light addPosBtn" onClick = {handleSaveEdit}>Save</button>}
            </div>}
            {!showAddForm && <div id = "selectCoInput" className = {!animate ? "grow" : "shrink"}>
                <label className = "addPositionLabel" htmlFor = "coName">Select a company:</label>
                {data && <select className = "addPositionInput" name = "coName" type = "text" value = {coName} onChange = {handleSelectChange}>
                    {data.map((company, key) => {
                        return (
                            <option key = {key} value = {company.co_name}>{company.co_name}</option>
                            );
                        })}
                </select>}
                {data && <div className = "progress" style = {{width: "50%", marginTop: "10px", marginLeft: "25%"}}>
                    <div className = "progress-bar progress-bar-striped progressColor" role = "progressbar" aria-label = "Success striped example" style = {{width: `${progress}%`}} aria-valuenow = "25" aria-valuemin = "0" aria-valuemax = "100">{progress}%</div>
                </div>}
                {!data && <div className = "spinner-grow text-warning position-absolute start-50 top-50 translate-middle" role = "status">
                    <span className = "visually-hidden">Loading...</span>
                </div>}
                {positions && <div className = "row mx-2">
                    {positions.map((position, id) => {
                        return (
                            <div key = {Math.random()} className = {!animate ? "col-sm-4 grow" : "col-sm-4 shrink"}>
                                <PositionsCard position = {position} handleEdit = {handleEdit} handleDelete = {handleDelete}></PositionsCard>
                            </div>
                        );
                    })}
                </div>
                }
            </div>}
            <video id = "background-video" autoPlay muted>
                    <source src = {myVideo} type="video/mp4"></source>
            </video>
        </div>
    );
}