import { useState, useEffect } from "react";
import Axios from "axios";
import "./positionsTree.css";

export default function PositionsTree() {
    const [data, setData] = useState();
    const [coName, setCoName] = useState("");
    const [positions, setPositions] = useState();
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [message, setMessage] = useState("");
    const [posLink, setPosLink] = useState("");
    const [occupied, setOccupied] = useState("No");
    const [showAddForm, setShowAddForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState();
    const [coId, setCoId] = useState();
    let totalOccupiedPositions = 0;

    useEffect(() => {
        Axios.get("http://localhost:5000/company/list").then((res) => {
            setData(res.data.rows);
            setCoName(res.data.rows[0].co_name);
            setCoId(res.data.rows[0].co_id);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        getAllPositions();
        setMessage("");
    }, [coName]);

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
            document.getElementById("message").style.color = "#5dff6a";
            setMessage(res.data);
            getAllPositions();
            setShowAddForm(!showAddForm);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleEdit = (event) => {
        setEdit(true);
        setId(event.target.id);
        setShowAddForm(true);
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
        }
    };

    const handleSaveEdit = (event) => {
        Axios.put("http://localhost:5000/positions/edit/" + id, {
            position: position,
            description: description,
            deadline: deadline,
            link: posLink,
            occupied: occupied
        }).then((res) => {
            console.log(res.data);
            document.getElementById("message").style.color = "#5dff6a";
            setMessage(res.data);
            setEdit(false);
            setPosition("");
            setDescription("");
            setDeadline("");
            setPosLink("");
            setOccupied("No");
            getAllPositions();
            setShowAddForm(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDelete = (event) => {
        Axios.delete("http://localhost:5000/positions/delete/" + event.target.id).then((res) => {
            document.getElementById("message").style.color = "#5dff6a";
            setMessage(res.data);
            getAllPositions();
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleShowHide = () => {
        setShowAddForm(!showAddForm);
        setEdit(false);
        setPosition("");
        setDescription("");
        setDeadline("");
        setPosLink("");
        setOccupied("No");
        setMessage("");
    };

    const handleSelectCompany = (event) => {
        setCoName(event.target.value);
        for(let i = 0; i < data.length; ++i) {
            if(data[i].co_name === event.target.value) {
                setCoId(data[i].co_id);
                break;
            }
        };
    };

    return(
        <div className = "treeContainer" style = {{color: "white"}}>
            {!showAddForm && <button onClick = {handleShowHide} className = "btn btn-primary showFormBtn">Add a new position to this Company</button>}
            {showAddForm && <button onClick = {handleShowHide} className = "btn btn-primary showFormBtn">Hide form</button>}
            <p id = "message">{message}</p>
            {showAddForm && <div id = "addPosContainer">
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
                {!edit && <button className = "btn btn-primary addPosBtn" onClick = {handleAddPosition}>Add position to {coName}</button>}
                {edit && <button className = "btn btn-primary addPosBtn" onClick = {handleSaveEdit}>Save</button>}
            </div>}
            {!showAddForm && <div id = "selectCoInput">
                <label className = "addPositionLabel" htmlFor = "coName">Select a company:</label>
                {data && <select className = "addPositionInput" name = "coName" type = "text" value = {coName} onChange = {handleSelectCompany} required>
                    {data.map((company, key) => {
                        return (
                            <option key = {key} value = {company.co_name}>{company.co_name}</option>
                            );
                        })}
                </select>}
                {!data && <p>Loading...</p>}
                {positions && <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Occupied</th>
                            </tr>
                        </thead>
                        <tbody id = "tableBody">
                            {positions.map((position, key) => {
                                return (
                                    <tr key = {key}>
                                        <td>{position.pos_name}</td>
                                        <td>{position.pos_description}</td>
                                        <td>{position.pos_deadline}</td>
                                        <td>{position.pos_occupied}</td>
                                        <td><button id = {position.pos_id} className = "actionBtn editBtn" onClick = {handleEdit}>Edit</button></td>
                                        <td><button id = {position.pos_id} className = "actionBtn deleteBtn" onClick = {handleDelete}>Delete</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>}
            </div>}
        </div>
    );
}