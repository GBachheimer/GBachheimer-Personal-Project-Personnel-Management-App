import { useState, useContext, useEffect } from "react";
import "./admin.css";
import { AuthContext } from "../../components/userContext";
import { getDocs, collection, updateDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../../components/firebase";
import { Button, Grid, Slide, TextField } from "@mui/material";
import SnackbarTemplate from "../../components/snackbarTemplate";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PaperTable from "./paperTable";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonOffIcon from '@mui/icons-material/PersonOff';

export default function Admin() {
    const [adminEmail, setAdminEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const [allAdmins, setAllAdmins] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [open, setOpen] = useState();
    const [severity, setSeverity] = useState("info");

    const handleSnackBar = () => {
        setOpen(false);
    }

    const {user} = useContext(AuthContext);

    const handleAdminEmail = (event) => {
        setAdminEmail(event.target.value);
    };

    const addAdmin = async(event) => {
        event.preventDefault();
        if (adminEmail === "") {
            setMessage("Please provide a user email!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        const newAdminRef = doc(db, "users", adminEmail);
        const docSnap = await getDoc(newAdminRef);
        if (docSnap.exists() && docSnap.data().admin) {
            setMessage(adminEmail + " is already an admin!");
            setSeverity("warning");
            setOpen(true);
            return;
        }
        if (!docSnap.exists()) {
            setMessage(adminEmail + " is not a valid user!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        await updateDoc(newAdminRef, {
            admin: true
        });
        setMessage(adminEmail + " is an admin now!");
        setSeverity("success");
        setOpen(true);
        setAllAdmins([]);
        getAllAdmins();
    };

    const deleteAdmin = async(event) => {
        event.preventDefault();
        if (adminEmail === "") {
            setMessage("Please provide a user email!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        if (user.email === adminEmail) {
            setMessage("You cannot revoke your own admin rights!");
            setSeverity("warning");
            setOpen(true);
            return;
        }
        const newAdminRef = doc(db, "users", adminEmail);
        const docSnap = await getDoc(newAdminRef);
        if (docSnap.exists() && !docSnap.data().admin) {
            setMessage(adminEmail + " is not an admin!");
            setSeverity("success");
            setOpen(true);
            return;
        }
        if (!docSnap.exists()) {
            setMessage(adminEmail + " is not a valid user!");
            setSeverity("error");
            setOpen(true);
            return;
        }
        await updateDoc(newAdminRef, {
            admin: false
        });
        setMessage(adminEmail + " admin rights revoked successfully!");
        setSeverity("success");
        setOpen(true);
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
        <Grid container justifyContent = "center" alignItems = "center" sx = {{marginTop: "10%"}} rowSpacing = {2}>
            <Slide direction = "down" in = {true} mountOnEnter unmountOnExit>
                <Grid xs = {10} sx = {{textAlign: "center"}} item>
                    <TextField 
                        required
                        id = "outlined-required"
                        label = "Email"
                        onChange = {handleAdminEmail}
                        sx = {{ width: "100%"}}
                        value = {adminEmail}
                    />
                </Grid>
            </Slide>
            <Grid xs = {5} sx = {{display: {xs: "block", md: "none"}}} item>
                <Button variant = "contained" endIcon = {<AdminPanelSettingsIcon />} onClick = {addAdmin}>
                    Make admin
                </Button>
            </Grid>
            <Grid xs = {5} sx = {{display: {xs: "block", md: "none"}, textAlign: "end"}} item>
                <Button variant = "contained" endIcon = {<PersonOffIcon />} onClick = {deleteAdmin}>
                    Revoke rights
                </Button>
            </Grid>
            {allUsers && <Slide direction = "up" in = {true} mountOnEnter unmountOnExit>
                <Grid xs = {10} md = {4} item>
                    <PaperTable allUsers = {allUsers} handleUserClick = {handleUserClick} tableHead = "Users"/>
                </Grid>
            </Slide>}
            <Grid xs = {2} sx = {{display: {xs: "none", md: "block"}, textAlign: "center"}} item>
                <Button variant = "contained" endIcon = {<ArrowRightIcon />} onClick = {addAdmin} sx = {{margin: "auto", minWidth: "90%"}}>
                    Make admin
                </Button>
                <Button variant = "contained" startIcon = {<ArrowLeftIcon />} onClick = {deleteAdmin} sx = {{margin: "auto", marginTop: "10px"}}>
                    Revoke rights
                </Button>
            </Grid>
            {allAdmins && <Slide direction = "up" in = {true} mountOnEnter unmountOnExit>
                <Grid xs = {10} md = {4} item>
                    <PaperTable allUsers = {allAdmins} handleUserClick = {handleUserClick} tableHead = "Admins"/>
                </Grid>
            </Slide>}
            <SnackbarTemplate severity = {severity} handleSnackBar = {handleSnackBar} open = {open} message = {message} />
        </Grid>
    );
}