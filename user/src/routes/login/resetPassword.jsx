import { useState } from "react";
import { auth } from "../../components/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Grid, Button, Box, TextField } from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';
import SnackbarTemplate from "../../components/snackbarTemplate";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState();
    const [severity, setSeverity] = useState("info");
    
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleSnackBar = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setMessage("Password reset email sent!");
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if(errorCode === "auth/missing-email" || errorCode === "auth/invalid-email" || errorCode === "auth/user-not-found") {
                setMessage("Please provide a valid email address!");
                setSeverity("error");
                setOpen(true);
            }
        });
    };

    return (
        <Grid container justifyContent = "center" alignItems = "center">
            <Grid item xs = {12} md = {6} sx = {{marginTop: "10vh"}}>
                <Box component = "form" sx = {{textAlign: "center"}}>
                    <TextField 
                        required
                        id = "outlined-required"
                        label = "Email"
                        onChange = {handleEmail}
                        sx = {{
                            width: "90%"
                        }}
                    />
                    <Button variant = "contained" endIcon = {<LockResetIcon />} onClick = {handleSubmit} sx = {{marginTop: "10px"}}>
                        Reset password
                    </Button>
                </Box>
                <SnackbarTemplate severity = {severity} handleSnackBar = {handleSnackBar} open = {open} message = {message}/>
            </Grid>
        </Grid>
    );
}