import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../components/firebase";
import { Link } from "react-router-dom";
import "./signup.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

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
                const user = userCredential.user;
                if (!user.emailVerified) {
                    setMessage("Please verify your email!");
                    return;
                }
                setMessage("You are logged in!");
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                document.getElementById("infoAlert").style.color = "#ff4469";
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
            })
    };

    const googleSignin = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }

    return(
        <div className = "position-absolute top-50 start-50 translate-middle mainContainer">
            <form>
                <label htmlFor = "email">Email:</label>
                <input type = "email" onChange = {handleEmail} value = {email} placeholder = "example@gmail.com" required></input>
                <label htmlFor = "password">Password:</label>
                <input type = "password" onChange = {handlePassword} value = {password} required></input>
                <p id = "infoAlert">{message}</p>
                <button className = "btn btn-primary submitButton" onClick = {handleSubmit}>Login</button>&nbsp;<p id = "or">or</p>&nbsp;
                <img alt = "googleIcon" width = "40" height = "40" src = "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" id = "googleImg"></img>&nbsp;
                <button className = "btn btn-primary submitButton" onClick = {googleSignin}>Login with Google</button>
            </form>
            <p>Don't have an account?  
                &nbsp;<Link to = "/signup" className = "linkStyle">Sign up!</Link>
                <br></br>
                <Link to = "/resetPassword" className = "linkStyle">Forgot your password?</Link>
            </p>
        </div>
    );
}