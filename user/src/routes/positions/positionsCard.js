import { useEffect, useState } from "react";
import "./positionsTree.css";
export default function PositionsCard(props) {
    // const [color, setColor] = useState();
    const [occupied, setOccupied] = useState();
    // const colors = ["#FFB6C1", "#E6E6FA", "#D8BFD8", "#E9967A", "	#FFFFE0", "#FFEFD5", "	#EEE8AA", "#9ACD32", "#66CDAA", "#8FBC8F", "#AFEEEE", "#E0FFFF", "#B0C4DE", "#F0FFFF", "#F0FFF0", "#DCDCDC", "#3CB371", "#BC8F8F", "#D8BFD8", "#F0E68C"];
    useEffect(() => {
        // setColor(colors[Math.floor(Math.random() * colors.length)]);
        if(props.position.pos_occupied === "Yes") {
            setOccupied(["Closed", "list-group-item test occupiedPosition"]);
        } else {
            setOccupied(["Open", "list-group-item test openPosition"]);
        };
    }, [props]);

    return (
        <div className = "card px-2 positionCardStyle">
            <div className = "card-body">
                <h5 className = "card-title">{props.position.pos_name}</h5>
                {props.position.pos_description && <p className = "card-text">{props.position.pos_description}</p>}
            </div>
            <ul className = "list-group list-group-flush magnifyInfo linesStyle">
                {props.position.pos_deadline && <li className = "list-group-item">Deadline: {props.position.pos_deadline}</li>}
                {props.position.pos_link && <a href = {props.position.pos_link} className = "list-group-item">See position announcement</a>}
                {occupied && <li className = {occupied[1]}>{occupied[0]}</li>}
            </ul>
            <div className = "card-body">
                <button id = {props.position.pos_id} onClick = {props.handleEdit} className = "btn btn-dark cardBtn">Edit</button>
                <button id = {props.position.pos_id} onClick = {props.handleDelete} className = "btn btn-dark cardBtn mx-2">Delete</button>
                {/* <Link className = "btn cardBtn" to = "/overview" state = {props.position.co_name}>See all positions</Link> */}
            </div>
        </div>
    );
}