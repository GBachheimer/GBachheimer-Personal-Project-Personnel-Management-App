import "./generalPrezentation.css";
import map from "./resources/map.png";
import positions from "./resources/positions.png";
import company from "./resources/company.png";
import admin from "./resources/admin.png";


export default function GeneralPrezentation() {
    return (
        <div className = "prezentationCoantainer">
            <div>
                <img className = "pictureMap fade-in-left2" src = {map} alt = "map"></img>
                <p className = "introText fade-in-right2">Do you need the expertise of an IT outsourcing company? We are here to offer the maximum possible quality.
                We always know what you need with the help of our application.</p>
            </div>
            <div>
                <p className = "introText fade-in-left2">Our platform keeps a clear record of clients and their requirements.</p>
                <img className = "pictureCompany fade-in-right2" src = {company} alt = "company"></img>
            </div>
            <div>
                <img className = "pictureMap fade-in-left2" src = {positions} alt = "positions"></img>
                <p className = "introText fade-in-right2">We store all customer needs in the application and we have a real-time overview at any time.</p>
            </div>
            <div>
                <p  id = "lastIntro" className = "introText fade-in-left2">We make sure that only our authorized people can have access to your valuable information.</p>
                <img className = "pictureCompany fade-in-right2" src = {admin} alt = "admin"></img>
            </div>
        </div>
    );
}