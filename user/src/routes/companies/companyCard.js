import "./crudCompanies.css";
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";

export default function CompanyCard(props) {
    const [toggleAnim, setToggleAnim] = useState();
    const [animate, setAnimate] = useState();
    useEffect(() => {
        setAnimate(true);
        setToggleAnim(!toggleAnim);
        setTimeout( () => { 
            setAnimate( false );
        }, 700 );
    }, [props]);
    return (
        <div className = {animate ? toggleAnim ? "card px-3 cardStyle rotate-in-up-right" : "card px-3 cardStyle rotate-in-up-left" : "card px-3 cardStyle"}>
            <div className = "card-body">
                <h5 className = "card-title">{props.company.co_name.replace(/_/g, " ")}</h5>
                <p className = "card-text">{props.company.co_address}, {props.company.co_city}, {props.company.co_state}, {props.company.co_country}</p>
            </div>
            <ul className = "list-group list-group-flush">
                <li className = "list-group-item">Total positions: {props.company.co_initial_total_positions}</li>
                <li className = "list-group-item">Initial open positions: {props.company.co_initial_free_positions}</li>
                <li className = "list-group-item">Lat: {props.company.co_lat} | Lng: {props.company.co_lng}</li>
            </ul>
            <div className = "card-body">
                <button id = {props.company.co_id} onClick = {props.handleEdit} className = "btn cardBtn m-1">Edit</button>
                <button id = {props.company.co_id} onClick = {props.handleDelete} className = "btn cardBtn m-1">Delete</button>
                <Link className = "btn cardBtn m-1" to = "/positions" state = {props.company.co_name}>Show all positions</Link>
                <Link className = "btn cardBtn m-1" to = "/overview" state = {props.company.co_name}>Show company on map</Link>
            </div>
        </div>
    );
}