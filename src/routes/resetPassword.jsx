import { useState } from "react";
import { auth } from "../components/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import "./signup.css";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const handleEmail = (event) => {
        setEmail(event.target.value);
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
                document.getElementById("infoAlert").style.color = "#ff4469";
                if(errorCode === "auth/missing-email") {
                    setMessage("Please provide a valid email address!");
                }
            });
    };

    return (
        <div className = "position-absolute start-50 top-50 translate-middle mainContainerResetPass">
            <form>
                <label htmlFor = "email" id = "labelResetPass">Email:</label>
                <input type = "email" value = {email} onChange = {handleEmail} placeHolder = "example@gmail.com" required/>
                <p id = "infoAlert">{message}</p>
                <button className = "btn btn-primary" onClick = {handleSubmit}>Reset password</button>
            </form>
        </div>
    );
}