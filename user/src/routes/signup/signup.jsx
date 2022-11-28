import { auth, provider } from "../../components/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                if (user) {
                    resendVerificationEmail();
                    saveUserToFirestore();
                }
            })
            .then(() => {
                document.getElementById("infoAlert").style.color = "#60ff44";
                setMessage("Please verify your email address before login!");
            })
            .then(() => {
                setTimeout(function() {
                    navigate("/login")
                }, 2000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                document.getElementById("infoAlert").style.color = "#ff4469";
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
                }
            });
    };

    const resendVerificationEmail = () => {
        sendEmailVerification(auth.currentUser)
        .catch((error) => {
            console.log(error.code);
            const errorCode = error.code;
            document.getElementById("infoAlert").style.color = "#ff4469";
            if (errorCode === "auth/too-many-requests") {
                setMessage("Previous email is still valid. Search in spam/junk folder or try again later.");
            } else if (errorCode === undefined) {
                setMessage("Create an account first!");
            }
        });
    };

    const googleSignUp = (event) => {
        event.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                saveUserToFirestore();
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    };

    const saveUserToFirestore = async() => {
        try {
            await setDoc(doc(db, "users", email), {
                admin: false
            });
        } catch (error) {
            console.loog(error);
        }
    };

    return(
        <div className = "position-absolute top-50 start-50 translate-middle mainContainer">
            <form className = "formStyle">
                <label htmlFor = "email" className = "labelSignUp">Email:</label>
                <input type = "email" id = "email" name = "email" placeholder = "example@gmail.com" onChange = {handleEmail} required className = "inputSignUp"></input>
                <label htmlFor = "password" className = "labelSignUp">Password:</label>
                <input type = "password" id = "password" name = "password" onChange = {handlePassword} required className = "inputSignUp"></input>
                <p id = "infoAlert" className = "messageSignUp">{message}</p>
                <button className = "btn btn-dark submitButton" onClick = {handleSubmit}>Sign up</button>&nbsp;
                <button className = "linkStyle or" disabled> or </button>&nbsp;
                <img alt = "googleIcon" width = "40" height = "40" src = "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" id = "googleImg" className = "imgStyle"></img>&nbsp;
                <button className = "btn btn-dark submitButton" onClick = {googleSignUp}>Sign up with Google</button>
            </form>
            <p id = "infoText" className = "messageSignUp">Already have an account? <Link to = "/login" className = "linkStyle">Login</Link></p>
            <button onClick = {resendVerificationEmail} className = "linkStyle messageSignUp">Resend verification email</button>
        </div>
    );
}