import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, Slide } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';

export default function PositionsCard(props) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleNavigate = (link) => {
        if (link.slice(0, 8) !== "https://") {
            link = "https://" + link;
        };
        window.open(link);
    };

    return (
        <Slide direction = "up" in = {props.animate} mountOnEnter unmountOnExit timeout = {500}>
            <Accordion expanded = {expanded === 'panel1'} onChange = {handleChange('panel1')} style = {{backgroundColor: "#3a91da", color: "white", marginTop: "1%"}}>
                <AccordionSummary
                    expandIcon = {<ExpandMoreIcon sx = {{color: "white"}}/>}
                    aria-controls = "panel1bh-content"
                    id = "panel1bh-header"
                >
                    <Typography>
                        {props.position.pos_name}
                    </Typography>
                    {props.position.pos_occupied && <Typography style = {{color: props.position.pos_occupied === "Yes" ? "tomato" : "#A0FFA0", display: "inline", marginLeft: "10%"}}>
                        Occupied: {props.position.pos_occupied}
                    </Typography>}
                </AccordionSummary>
                <AccordionDetails>
                    {props.position.pos_description && <Typography sx = {{textAlign: "start", marginLeft: "7%"}}>
                        Description: {props.position.pos_description}
                    </Typography>}
                    {props.position.pos_description && <Divider sx = {{my: 1}} />}
                    {props.position.pos_deadline && <Typography sx = {{textAlign: "start", marginLeft: "7%"}}>
                        Deadline: {props.position.pos_deadline.slice(0, 10)}
                    </Typography>}
                    {props.position.pos_deadline && <Divider sx = {{mt: 1}} />}
                    <Button endIcon = {<ModeEditIcon/>} variant = "outlined" id = {props.position.pos_id} onClick = {props.handleEdit} sx = {{minWidth: "30%", m: 1, color: "white"}}>Edit</Button>
                    <Button endIcon = {<DeleteIcon/>} variant = "outlined" id = {props.position.pos_id} onClick = {props.handleDelete} sx = {{minWidth: "30%", m: 1, color: "white"}}>Delete</Button>
                    {props.position.pos_link && <Button endIcon = {<LaunchIcon/>} variant = "outlined" onClick = {() => handleNavigate(props.position.pos_link)} sx = {{minWidth: "30%", mx: 1, my: 2, color: "white"}}>Position announcement</Button>}
                </AccordionDetails>
            </Accordion>
        </Slide>
    );
}