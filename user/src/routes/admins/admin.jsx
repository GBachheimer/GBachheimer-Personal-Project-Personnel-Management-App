import { useState, useContext, useEffect } from "react";
import "./admin.css";
import { AuthContext } from "../../components/userContext";
import { getDocs, collection, updateDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../../components/firebase";
import myVideo from "../companies/stockfootage0211.mp4";

export default function Admin() {
    const [adminEmail, setAdminEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const [allAdmins, setAllAdmins] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const {user} = useContext(AuthContext);

    const handleAdminEmail = (event) => {
        setAdminEmail(event.target.value);
    };

    const addAdmin = async(event) => {
        event.preventDefault();
        const newAdminRef = doc(db, "users", adminEmail);
        const docSnap = await getDoc(newAdminRef);
        if (docSnap.exists() && docSnap.data().admin) {
            setMessage(adminEmail + " is already an admin!");
            return;
        }
        if (!docSnap.exists()) {
            setMessage(adminEmail + " is not a valid user!");
            return;
        }
        await updateDoc(newAdminRef, {
            admin: true
        });
        setMessage(adminEmail + " is an admin now!");
        setAllAdmins([]);
        getAllAdmins();
    };

    const deleteAdmin = async(event) => {
        event.preventDefault();
        if (user.email === adminEmail) {
            setMessage("You cannot revoke your own admin rights!");
            return;
        }
        const newAdminRef = doc(db, "users", adminEmail);
        const docSnap = await getDoc(newAdminRef);
        if (docSnap.exists() && !docSnap.data().admin) {
            setMessage(adminEmail + " is not an admin!");
            return;
        }
        if (!docSnap.exists()) {
            setMessage(adminEmail + " is not a valid user!");
            return;
        }
        await updateDoc(newAdminRef, {
            admin: false
        });
        setMessage(adminEmail + " admin rights revoked successfully!");
        setAllAdmins([]);
        getAllAdmins();
    };

    const getAllAdmins = async() => {
        setAllAdmins([]);
        setAllUsers([]);
        const allAdminsRef = collection(db, "users");
        const q = query(allAdminsRef, where("admin", "==", true));
        const querySnapshotAdmins = await getDocs(q);
        const querySnapshotUsers = await getDocs(allAdminsRef);
        querySnapshotAdmins.forEach((doc) => {
            setAllAdmins(current => [...current, doc.id]);
        });
        querySnapshotUsers.forEach((doc) => {
            setAllUsers(current => [...current, doc.id]);
        });
    };

    useEffect(() => {
        getAllAdmins();
    }, []);

    const handleUserClick = (event) => {
        setAdminEmail(event.target.value);
    };

    return (
        <div className = "adminContainer">
            <div className = "formStyle2">
                <label htmlFor = "adminEmail" className = "adminEmailLabel">Email:</label>
                <input type = "email" placeholder = "example@gmail.com" name = "adminEmail" onChange = {handleAdminEmail} className = "adminEmail" value = {adminEmail} required></input>
                <p style = {{marginTop: "10px", color: "white"}}>{message}</p>
                <button onClick = {addAdmin} className = "btn btn-light adminActions">Make Admin</button>
                <button onClick = {deleteAdmin} className = "btn btn-light adminActions">Revoke Admin Rights</button>
            </div>
            <div>
                {(allAdmins.length === 0) && <div className = "spinner-grow text-warning" role = "status">
                    <span className = "visually-hidden">Loading...</span>
                </div>}
                {(allAdmins.length > 0) && <table className = "fade-in-left">
                    <thead>
                        <tr>
                            <th>Admins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAdmins.map((adminName, id) => {
                            return (<tr key = {id}>
                                <button className = "userListStyle" value = {adminName} onClick = {handleUserClick}>{adminName}</button>
                            </tr>)
                        })}
                    </tbody>
                </table>}
                {(allUsers.length === 0) && <div className = "spinner-grow text-warning" role = "status">
                    <span className = "visually-hidden">Loading...</span>
                </div>}
                {(allUsers.length > 0) && <table className = "fade-in-right">
                    <thead>
                        <tr>
                            <th>All Users</th>
                        </tr>    
                    </thead>
                    <tbody>
                    {allUsers.map((userName, id) => {
                        return <tr key = {id}>
                            <td><button className = "userListStyle" value = {userName} onClick = {handleUserClick}>{userName}</button></td>
                        </tr>
                    })}
                    </tbody>
                </table>}
            </div>
            <video className = "background-video" autoPlay muted loop>
                    <source src = {myVideo} type="video/mp4"></source>
            </video>
        </div>
    );
}