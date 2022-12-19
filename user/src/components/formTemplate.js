import { Box, TextField, Button, Divider, Chip, Grid, Typography, Slide} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { signInWithPopup } from "firebase/auth";
import { auth, provider} from "./firebase";
import { saveUserToFirestore } from "..";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useNavigate } from "react-router-dom";

export default function FormTemplate(props) {
    const navigate = useNavigate();

    const GoogleIcon = <img 
        alt = "googleIcon" 
        width = "25" 
        height = "25" 
        src = "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
    ></img>

    const googleSignUp = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            saveUserToFirestore(result.user.email);
            navigate("/overview");
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
        });
    };

    const handleLink = () => {
        props.handleAnimate();
        setTimeout(() => {
            navigate(props.linkTo);
        }, 500);
    };

    return (
        <>
            <Grid item xs = {12} md = {6} sx = {{marginTop: "10vh"}}>
                <Box component = "form" sx = {{textAlign: "center"}}>
                    <Slide direction = "down" in = {props.animate} mountOnEnter unmountOnExit timeout={600}>
                        <TextField 
                            required
                            autoComplete = "true"
                            id = "outlined-required"
                            label = "Email"
                            onChange = {props.handleEmail}
                            sx = {{
                                width: "90%"
                            }}
                        />
                    </Slide>
                    <Slide direction = "down" in = {props.animate} mountOnEnter unmountOnExit timeout={600}>
                        <TextField 
                            required 
                            id = "outlined-password-input" 
                            label = "Password" 
                            type = "password"
                            autoComplete = "current-password"
                            onChange = {props.handlePassword}
                            sx = {{
                                marginTop: "10px",
                                width: "90%",
                                marginBottom: "10px"
                            }}
                        />
                    </Slide>
                    <Slide direction = "left" in = {props.animate} mountOnEnter unmountOnExit timeout={600}>
                        <Button variant = "contained" endIcon = {<SendIcon />} onClick = {props.handleSubmit}>
                            {props.firstButton}
                        </Button>
                    </Slide>
                    <Divider sx = {{margin: "10px"}}>
                        <Chip label="OR" />
                    </Divider>
                    <Slide direction = "right" in = {props.animate} mountOnEnter unmountOnExit timeout={600}>
                        <Button variant = "contained" endIcon = {GoogleIcon} onClick = {googleSignUp} color = "secondary">
                            {props.secondButton}
                        </Button>
                    </Slide>
                </Box>
            </Grid>
            <Slide direction = "up" in = {props.animate} mountOnEnter unmountOnExit timeout={600}>
                <Grid item xs = {12} sx = {{textAlign: "center", marginTop: "10px"}}>
                    <Typography variant = "body1">
                        {props.startQuestion} have an account?
                        <InsertLinkIcon sx = {{marginBottom: "-10px"}} />
                        <Button variant = "text" onClick = {handleLink}>{props.linkText}</Button>
                    </Typography>
                </Grid>
            </Slide>
            <Slide direction = "up" in = {props.animate} mountOnEnter unmountOnExit timeout={600}>
                <Grid item xs = {12} sx = {{textAlign: "center"}}>
                    <Button variant = "text" onClick = {props.thirdButtonAction}>{props.thirdButtonText}</Button>
                </Grid>
            </Slide>
        </>
    );
}