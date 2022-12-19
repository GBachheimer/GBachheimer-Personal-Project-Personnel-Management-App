import { Box, Typography, Button, Collapse, Divider } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';

export default function PaperTable(props) {

    return(
        <Box  sx = {{textAlign: "center"}}>
            <Typography variant = "h5"> {props.tableHead}</Typography>
            <Divider sx = {{width: "80%", margin: "auto", my: 1}}/>
            <TransitionGroup>
                {props.allUsers.map((user, index) => (
                    <Collapse key = {index}>
                        <Button sx = {{mt: 1}} variant = "text" onClick = {props.handleUserClick} value = {user}>
                            {user}
                        </Button>
                    </Collapse>
                ))}
            </TransitionGroup>
        </Box>
    );
}