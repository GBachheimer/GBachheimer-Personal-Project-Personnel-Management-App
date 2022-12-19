
import { Link} from "react-router-dom";
import { Card, CardHeader, Button, Typography, CardActions, CardContent, Divider } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import companyImg from "./industry-1.png"

export default function CompanyCard(props) {

    return (
        <Card sx = {{marginTop: "1%", backgroundColor: "#3a91da", color: "white"}}>
            <CardHeader
                title =  {
                    <Typography gutterBottom variant = "h5" component = "h2" sx = {{display: "inline"}}>
                        {props.company.co_name}
                    </Typography>}
                subheader = {
                    <Typography sx = {{color: "white"}}>
                        {props.company.co_address + ", " + props.company.co_city + ", " + props.company.co_state + ", " + props.company.co_country}
                    </Typography>}
            />
            <CardContent sx = {{display: "inline"}}>
                <img alt = "test" src = {companyImg}></img>
                <Typography variant = "body2" color = "text.secondary" sx = {{textAlign: "left", marginLeft: "10%", color: "white"}}>
                    Initial total positions: {props.company.co_initial_total_positions}
                </Typography>
                <Divider sx = {{width: "80%", margin: "auto", marginTop: "1%", marginBottom: "1%"}} />
                <Typography variant = "body2" color = "text.secondary" sx = {{textAlign: "left", marginLeft: "10%", color: "white"}}>
                    Initial open positions: {props.company.co_initial_free_positions}
                </Typography>
                <Divider sx = {{width: "80%", margin: "auto", marginTop: "1%", marginBottom: "1%"}}/>
                <Typography variant = "body2" color = "text.secondary" sx = {{textAlign: "left", marginLeft: "10%", color: "white"}}>
                    Lat: {props.company.co_lat} | Long: {props.company.co_lng}
                </Typography>
                <Divider sx = {{width: "80%", margin: "auto", marginTop: "1%"}}/>
            </CardContent>
            <CardActions sx = {{display: {xs: "block", md: "inline"}}}>
                <Button sx = {{m: 2, color: "white"}} variant = "outlined" startIcon = {<ModeEditIcon />} id = {props.company.co_id} onClick = {props.handleEdit}>Edit</Button>
                <Button sx = {{m: 2, color: "white"}}  variant = "outlined" startIcon = {<DeleteIcon />} id = {props.company.co_id} onClick = {props.handleDelete}>Delete</Button>
                <Button sx = {{m: 2, color: "white"}}  variant = "outlined" startIcon = {<WorkIcon />} >
                    <Link to = "/positions" state = {[props.company.co_name, props.company.co_id]} style = {{textDecoration: "none", color: "white"}}>Positions</Link>
                </Button>
                <Button sx = {{m: 2, color: "white"}}  variant = "outlined" startIcon = {<LocationOnIcon />}>
                    <Link to = "/overview" state = {props.company.co_name} style = {{textDecoration: "none", color: "white"}}>See Location</Link>
                </Button>
            </CardActions>
        </Card>
    );
}