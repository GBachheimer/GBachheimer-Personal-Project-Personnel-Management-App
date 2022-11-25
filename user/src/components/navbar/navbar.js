import { Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
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
        <nav className = "navbar navbar-expand-lg bg-light" style = {{fontSize: "0.8rem"}}>
            <div className = "container-fluid mx-2">
                <Link className = "navbar-brand" to = "/" style = {{fontSize: "0.8rem"}}>Home</Link>
                <ul className = "navbar-nav">
                    {(!user || (user && !user.emailVerified)) && <li className = "nav-item">
                        <Link className = "nav-link" aria-current = "page" to = "/signup">Sign up</Link>
                    </li>}
                    {(!user || (user && !user.emailVerified)) && <li className = "nav-item">
                        <Link className = "nav-link" to = "/login">Login</Link>
                    </li>}
                    {user && user.emailVerified && <div className = "dropdown">
                        <button className = "nav-link dropdown-toggle buttonStyleNavbar" data-bs-toggle = "dropdown" aria-expanded = "false">
                            Menu
                        </button>
                        <ul className = "dropdown-menu">
                            {admin && <li><Link className = "dropdown-item" to = "/overview">Overview</Link></li>}
                            <li><Link className = "dropdown-item" to = "/statistics">Statistics</Link></li>
                            {admin && <li><Link className = "dropdown-item" to = "/positions">Positions</Link></li>}
                            {admin && <li><Link className = "dropdown-item" to = "/companies">Companies</Link></li>}
                            {admin && <li><Link className = "dropdown-item" to = "/admins">Admins</Link></li>}
                        </ul>
                    </div>}
                    {user && user.emailVerified && <li className = "nav-item">
                        <button className = "nav-link buttonStyleNavbar" onClick = {logOut}>Logout</button>
                    </li>}
                </ul>
            </div>
        </nav>
    );
}