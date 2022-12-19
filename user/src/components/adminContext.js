import { createContext, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const [admin, setAdmin] = useState(null);

    auth.onAuthStateChanged(async(userContext) => {
        if(userContext) {
        const docRef = doc(db, "users", userContext.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().admin) {
            setAdmin(true);
        } else {
            setAdmin(null);
        }};
    });

    return(
        <AdminContext.Provider value = {{admin}}>
            {children}
        </AdminContext.Provider>
    );
}