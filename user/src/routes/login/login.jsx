import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "../../components/firebase";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import FormTemplate from "../../components/formTemplate";
import SnackbarTemplate from "../../components/snackbarTemplate";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState();
    const [severity, setSeverity] = useState("info");
    const [animate, setAnimate] = useState(true);

    const handleAnimate = () => {
        setAnimate(!animate);
    };

    const navigate = useNavigate();

    const handleSnackBar = () => {
        setOpen(false);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (!userCredential.user.emailVerified) {
                setMessage("Please verify your email!");
                return;
            }
            navigate("/overview");
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === "auth/wrong-password") {
                setMessage("Wrong password!");
            } else if (errorCode === "auth/invalid-email") {
                setMessage("Wrong email address!");
            } else if (errorCode === "auth/internal-error") {
                setMessage("Please provide a valid email or password!");
            } else if (errorCode === "auth/user-not-found") {
                setMessage("This account doesn't exists!");
            } else {
                setMessage("There was a problem, please try again!");
            }
            setSeverity("error");
            setOpen(true);
        })
    };

    const renderResetPassword = () => {
        navigate("/resetPassword");
    }

    return(
        <Grid container justifyContent = "center" alignItems = "center">
            <FormTemplate 
                handleEmail = {handleEmail}
                handlePassword = {handlePassword}
                handleSubmit = {handleSubmit}
                firstButton = "Login"
                secondButton = "Login with Google"
                startQuestion = "Don't"
                linkTo = "/signUp"
                linkText = "Sign up!"
                thirdButtonAction = {renderResetPassword}
                thirdButtonText = "Forgot your password?"
                animate = {animate}
                handleAnimate = {handleAnimate}
            />
            <SnackbarTemplate severity = {severity} handleSnackBar = {handleSnackBar} open = {open} message = {message} />
        </Grid>
    );
}