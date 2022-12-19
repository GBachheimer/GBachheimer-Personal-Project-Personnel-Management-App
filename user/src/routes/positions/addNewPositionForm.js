import { Grid, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grow } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AddNewPositionForm(props) {
    return(
        <Grow in = {!props.animate}>
        <Grid item sx = {{margin: "auto"}}>
            <TextField 
                required
                autoComplete = "true"
                id = "outlined-required"
                label = "Position Name"
                onChange = {props.handlePositionName}
                value = {props.position}
                sx = {{
                    width: "100%",
                    marginTop: "2%"
                }}
            />
            <TextField
                autoComplete = "true"
                id = "outlined-required"
                label = "Link to job description"
                onChange = {props.handleLinkToJob}
                value = {props.posLink}
                sx = {{
                    width: "100%",
                    marginTop: "2%"
                }}
                />
            <TextField
                autoComplete = "true"
                id = "outlined-required"
                label = "Other details"
                onChange = {props.handleDetails}
                value = {props.description}
                sx = {{
                    width: "100%",
                    marginTop: "2%"
                }}
            />
            <LocalizationProvider dateAdapter = {AdapterDayjs}>
                <DatePicker
                    label = "Deadline"
                    onChange = {props.handleDeadline}
                    value = {props.deadline}
                    renderInput={(params) => <TextField {...params} sx = {{ width: "100%", marginTop: "2%"}}/>}
                />
            </LocalizationProvider>
            {props.edit && <FormControl sx = {{marginTop: "2%"}}>
                <FormLabel id = "radio-buttons-group-label">Position is now occupied?</FormLabel>
                <RadioGroup
                    aria-labelledby = "radio-buttons-group-label"
                    name = "radio-buttons-group"
                    onChange = {props.handleOccupied}
                    value = {props.occupied}
                    sx = {{display: "inline"}}
                >
                    <FormControlLabel value = "No" control = {<Radio sx = {{display: "inline"}}/>} label = "No" />
                    <FormControlLabel value = "Yes" control = {<Radio sx = {{display: "inline"}}/>} label = "Yes" />
                </RadioGroup>
            </FormControl>}
            {!props.edit && <Button startIcon = {<PersonAddIcon />} variant = "contained" id = {props.posId} sx = {{marginTop: "2%", width: "100%"}} onClick = {props.handleAddPosition}>Add position to {props.coName}</Button>}
            {props.edit && <Button startIcon = {<PersonAddIcon />} variant = "contained" id = {props.posId} sx = {{marginTop: "2%", width: "100%"}} onClick = {props.handleSaveEdit}>Save</Button>}
        </Grid>
        </Grow>
    );
}