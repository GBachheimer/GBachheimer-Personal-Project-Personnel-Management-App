import { Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../userContext";
import { AdminContext } from "../adminContext";
import "./navbar.css";

export default function Navbar(props) {
    const {user} = useContext(AuthContext);
    const {admin} = useContext(AdminContext);
    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth);
        navigate("/");
        console.log("Logged out!");
    }

    return (
        <nav className = "navbar navbar-dark bg-dark bg-opacity-50">
            <NavLink className = "navbar-brand mx-4 p-1" to = "/" style = {{fontSize: "0.8rem"}}>Home</NavLink>
            {(!user || (user && !user.emailVerified)) && <div>
                <NavLink className = "buttonStyleNavbar mx-2 p-1" aria-current = "page" to = "/signup">Sign up</NavLink>
                <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/login">Login</NavLink>
            </div>}
            {user && user.emailVerified && <div>
                <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/overview">Overview</NavLink>
                <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/statistics">Statistics</NavLink>
                {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/positions">Positions</NavLink>}
                {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/companies">Companies</NavLink>}
                {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/admins">Admins</NavLink>}
                <button className = "buttonStyleNavbar mx-2 p-1" onClick = {logOut}>Logout</button>
            </div>}
        </nav>
    );
}