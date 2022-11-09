import { get } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { ref } from "firebase/database";
import { AuthContext } from "./userContext";

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const [admin, setAdmin] = useState(null);
    const {userContext} = useContext(AuthContext);

    var userEmail = "";
    useEffect(() => {
    auth.onAuthStateChanged((user) => {
        get(ref(db, "admins/" + user.email.replace(".", "@_@"))).then(snapshot => {
            if (snapshot.exists()) {
                setAdmin(true);
            } else {
                setAdmin(null);
            }
        }).catch((error) => {
            console.log(error);
        })
    })}, []);

    return(
        <AdminContext.Provider value = {{admin}}>
            {children}
        </AdminContext.Provider>
    );
}