import "./crudCompanies.css";
import { Link} from "react-router-dom";

export default function CompanyCard(props) {

    return (
        <div className = {!props.animateHide ? "card px-3 cardStyle rotate-out-down-left" : props.toggleAnim ? "card px-3 cardStyle rotate-in-up-right" : "card px-3 cardStyle rotate-in-up-left"}>
            <div className = "card-body">
                <h5 className = "card-title">{props.company.co_name}</h5>
                <p className = "card-text">{props.company.co_address}, {props.company.co_city}, {props.company.co_state}, {props.company.co_country}</p>
            </div>
            <ul className = "list-group list-group-flush listStyle">
                <li className = "list-group-item">Total positions: {props.company.co_initial_total_positions}</li>
                <li className = "list-group-item">Initial open positions: {props.company.co_initial_free_positions}</li>
                <li className = "list-group-item">Lat: {props.company.co_lat} | Lng: {props.company.co_lng}</li>
            </ul>
            <div className = "card-body">
                <button id = {props.company.co_id} onClick = {props.handleEdit} className = "btn cardBtn btn-dark m-1">Edit</button>
                <button id = {props.company.co_id} onClick = {props.handleDelete} className = "btn cardBtn btn-dark m-1">Delete</button>
                <Link className = "btn btn-dark cardBtn m-1" to = "/positions" state = {[props.company.co_name, props.company.co_id]}>Show all positions</Link>
                <Link className = "btn btn-dark cardBtn m-1" to = "/overview" state = {props.company.co_name}>Show company on map</Link>
            </div>
        </div>
    );
}