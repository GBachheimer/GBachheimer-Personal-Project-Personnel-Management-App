import { useState, useContext } from "react";
import "./admin.css";
import { AuthContext } from "../components/userContext";
import { db, dbRef } from "../components/firebase";
import { get, set, ref, child, remove } from "firebase/database";

export default function Admin() {
    const [adminEmail, setAdminEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const {user} = useContext(AuthContext);
    const uid = user.uid;

    const handleAdminEmail = (event) => {
        setAdminEmail(event.target.value);
    };

    const addAdmin = (event) => {
        const adminEmailForDb = adminEmail.replace(".", "@_@");
        if (adminEmail === "") {
            setMessage("Please enter a user email!");
            return;
        }
        get(child(dbRef, "users/" + adminEmailForDb)).then(snapshot => {
            if (snapshot.exists()) {
                set(ref(db, 'admins/' + adminEmailForDb), {
                    uid: uid
                }).then(() => {
                    setMessage(adminEmail + " successfully granted admin rights!");
                });
            } else {
                setMessage("This email is not valid!");
            }
        }).catch((error) => {
            setMessage(error);
        });
    };

    const deleteAdmin = (event) => {
        event.preventDefault();
        const adminEmailForDb = adminEmail.replace(".", "@_@");
        get(child(dbRef, "admins/" + adminEmailForDb)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(db, "admins/" + adminEmailForDb)).then(() => {
                    setMessage(adminEmail + " admin rights revoked successfully!");
                });
            } else {
                setMessage("This email is not an admin.");
            }
        }).catch((error) => {
            setMessage(error);
        });
    };

    return (
        <div className = "adminContainer position-absolute start-50 top-50 translate-middle">
            <label htmlFor = "adminEmail">Email:</label>
            <input type = "email" placeholder = "example@gmail.com" name = "adminEmail" onChange = {handleAdminEmail} className = "adminEmail" value = {adminEmail} required></input>
            <p>{message}</p>
            <button onClick = {addAdmin} className = "btn btn-primary adminActions">Make Admin</button>
            <button onClick = {deleteAdmin} className = "btn btn-primary adminActions">Revoke Admin Rights</button>
        </div>
    );
}