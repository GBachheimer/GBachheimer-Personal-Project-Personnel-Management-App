import { auth } from "../../components/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { Grid } from "@mui/material";
import FormTemplate from "../../components/formTemplate";
import { saveUserToFirestore } from "../..";
import SnackbarTemplate from "../../components/snackbarTemplate";
import "./signup.css";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState();
    const [severity, setSeverity] = useState("info");
    const [animate, setAnimate] = useState(true);

    const handleAnimate = () => {
        setAnimate(!animate);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSnackBar = () => {
        setOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            if (userCredentials.user) {
                resendVerificationEmail();
                saveUserToFirestore(email);
            };
        })
        .then(() => {
            setMessage("Please verify your email address before login!");
            setSeverity("success");
            setOpen(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " | " + errorMessage);
            if(errorCode === "auth/invalid-email" || errorCode === "auth/missing-email") {
                setMessage("Please provide a valid email address!");
            } else if (errorCode === "auth/email-already-in-use") {
                setMessage("This email is already assigned to another account. If you are the owner please login!");
            } else if (errorCode === "auth/weak-password") {
                setMessage("Please provide a strong password!");
            } else if (errorCode === "auth/internal-error") {
                setMessage("Please provide a password!");
            } else {
                setMessage("There was a problem, please try again!");
            };
            setSeverity("error");
            setOpen(true);
        });
    };

    const resendVerificationEmail = () => {
        sendEmailVerification(auth.currentUser)
        .catch((error) => {
            console.log(error.code);
            const errorCode = error.code;
            if (errorCode === "auth/too-many-requests") {
                setMessage("Previous email is still valid. Search in spam/junk folder or try again later.");
            } else if (errorCode === undefined) {
                setMessage("Create an account first!");
            };
            setSeverity("warning");
            setOpen(true);
        });
    };

    return(
        <Grid container justifyContent = "center" alignItems = "center" className = "">
            <FormTemplate 
                handleEmail = {handleEmail}
                handlePassword = {handlePassword}
                handleSubmit = {handleSubmit}
                firstButton = "Sign up"
                secondButton = "Sign up with Google"
                startQuestion = "Already"
                linkTo = "/login"
                linkText = "Login!"
                thirdButtonAction = {resendVerificationEmail}
                thirdButtonText = "Resend verification email!"
                animate = {animate}
                handleAnimate = {handleAnimate}
            />
            <SnackbarTemplate severity = {severity} handleSnackBar = {handleSnackBar} open = {open} message = {message}/>
        </Grid>
    );
}