import { useState, useContext, useEffect } from "react";
import "./admin.css";
import { AuthContext } from "../components/userContext";
import { getDocs, collection, updateDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../components/firebase";

export default function Admin() {
    const [adminEmail, setAdminEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const [allAdmins, setAllAdmins] = useState([]); 

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
        const allAdminsRef = collection(db, "users");
        const q = query(allAdminsRef, where("admin", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setAllAdmins(current => [...current, doc.id]);
        });
    }

    useEffect(() => {
        getAllAdmins();
    }, []);

    return (
        <div className = "adminContainer position-absolute start-50 top-50 translate-middle">
            <div className = "formStyle2">
                <label htmlFor = "adminEmail" id = "adminEmailLabel">Email:</label>
                <input type = "email" placeholder = "example@gmail.com" name = "adminEmail" onChange = {handleAdminEmail} className = "adminEmail" value = {adminEmail} required></input>
                <p style = {{marginTop: "5px"}}>{message}</p>
                <button onClick = {addAdmin} className = "btn btn-primary adminActions">Make Admin</button>
                <button onClick = {deleteAdmin} className = "btn btn-primary adminActions">Revoke Admin Rights</button>
            </div>
            <div>
                {(allAdmins.length === 0) && <p>Loading</p>}
                {(allAdmins.length > 0) && <table>
                    <tr>
                        <th>Admins</th>
                    </tr>
                    {allAdmins.map((adminName, id) => {
                    return <tr key = {id}>{adminName}</tr>
                    })}
                </table>}
            </div>
        </div>
    );
}