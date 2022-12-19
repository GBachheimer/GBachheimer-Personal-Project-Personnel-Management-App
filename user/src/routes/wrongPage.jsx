import { useContext } from "react";
import { AuthContext } from "../components/userContext";

export default function WrongPage(props) {
    const {user} = useContext(AuthContext);
    if (user) {
        return(
            <div className = "position-absolute top-50 start-50 translate-middle" style = {{color: "white"}}>
                Loading...
            </div>
        );
    } else {
        return(
            <div className = "position-absolute top-50 start-50 translate-middle" style = {{color: "white"}}>
                Ups! Something went wrong!
            </div>
        );
    }
}