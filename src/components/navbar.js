import { Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth);
        navigate("/");
        console.log("Logged out!");
    }

    return (
        <nav className = "navbar navbar-expand-lg bg-light">
            <div className = "container-fluid mx-2">
                <Link className = "navbar-brand" to = "/">Home</Link>
                <ul className = "navbar-nav">
                    <li className = "nav-item">
                        <Link className = "nav-link" aria-current = "page" to = "/signup">Sign up</Link>
                    </li>
                    <li className = "nav-item">
                        <Link className = "nav-link" to = "/login">Login</Link>
                    </li>
                    <div className = "dropdown">
                        <a className = "nav-link dropdown-toggle" role = "button" data-bs-toggle = "dropdown" aria-expanded = "false">
                            My Company
                        </a>
                        <ul className = "dropdown-menu">
                            <li><Link className = "dropdown-item" to = "/overview">Overview</Link></li>
                            <li><Link className = "dropdown-item" to = "/tree">Tree</Link></li>
                            <li><Link className = "dropdown-item" to = "/statistics">Statistics</Link></li>
                            <li><Link className = "dropdown-item" to = "/deadlines">Deadlines</Link></li>
                            <li><Link className = "dropdown-item" to = "/addCompany">Add | Delete Company</Link></li>
                        </ul>
                    </div>
                    <li className = "nav-item">
                        <button className = "nav-link" onClick = {logOut}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}