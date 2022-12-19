import map from "./resources/map2.png";
import positions from "./resources/pickingman_background.png";
import company from "./resources/industry-1.png";
import admin from "./resources/lock.png";
import { Divider, Grid, Typography, Zoom, Slide } from "@mui/material";
import "./generalPrezentation.css";

export default function GeneralPrezentation() {
    return (
        <Grid container sx = {{textAlign: "center"}}>
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <Grid container item xs = {12} md = {10} sx = {{margin: "auto", textAlign: "center", my: 5}}>
                <Zoom in = {true} style = {{ transitionDelay: '400ms'}}>
                    <Grid item xs = {10} md = {4} sx = {{margin: "auto"}}>
                        <img src = {map} width = "300px" className = "swing"></img>
                    </Grid>
                </Zoom>
                <Slide direction = "left" in = {true} mountOnEnter unmountOnExit timeout = {600}>
                    <Grid item xs = {10} md = {6} sx = {{margin: "auto"}}>
                        <Typography variant = "h3">
                            Road map for success!
                        </Typography>
                        <Divider sx = {{my: 2}}/>
                        <Typography variant = "body">
                            Do you need the expertise of an IT outsourcing company? 
                            We are here to offer the maximum possible quality. 
                            We always know what you need with the help of our application.
                        </Typography>
                    </Grid>
                </Slide>
            </Grid>
            <Grid container item xs = {12} md = {10} sx = {{margin: "auto", textAlign: "center", my: 5}}>
                <Slide direction = "right" in = {true} mountOnEnter unmountOnExit timeout = {600}>
                    <Grid item xs = {10} md = {6} sx = {{margin: "auto", my: 2}}>
                        <Typography variant = "h3">
                            Treat the customer as we are the customer.
                        </Typography>
                        <Divider sx = {{my: 2}}/>
                        <Typography variant = "body">
                            Our platform keeps a clear record of clients and their requirements.
                        </Typography>
                    </Grid>
                </Slide>
                <Zoom in = {true} style = {{ transitionDelay: '400ms'}}>
                    <Grid md = {4} sx = {{margin: "auto", my: 2}}>
                        <img src = {company} width = "300px"></img>
                    </Grid>
                </Zoom>
            </Grid>
            <Grid container item xs = {12} md = {10} sx = {{margin: "auto", textAlign: "center", my: 5}}>
                <Zoom in = {true} style = {{ transitionDelay: '1000ms'}}>
                    <Grid item xs = {10} md = {4} sx = {{margin: "auto", my: 2}}>
                        <img src = {positions} width = "300px"></img>
                    </Grid>
                </Zoom>
                <Slide direction = "left" in = {true} mountOnEnter unmountOnExit timeout = {600}>
                    <Grid item xs = {10} md = {6} sx = {{margin: "auto"}}>
                        <Typography variant = "h3">
                            Inside of every problem lies an opportunity.
                        </Typography>
                        <Divider sx = {{my: 2}}/>
                        <Typography variant = "body">
                            We store all customer needs in the application and we have a real-time overview at any time.
                        </Typography>
                    </Grid>
                </Slide>
            </Grid>
            <Grid container item xs = {12} md = {10} sx = {{margin: "auto", textAlign: "center", my: 5}}>
                <Slide direction = "right" in = {true} mountOnEnter unmountOnExit timeout = {600}>
                    <Grid item xs = {10} md = {6} sx = {{margin: "auto"}}>
                        <Typography variant = "h3">
                            We are not reclusive at all. Just private.
                        </Typography>
                        <Divider sx = {{my: 2}}/>
                        <Typography variant = "body">
                            We make sure that only our authorized people can have access to your valuable information.
                        </Typography>
                    </Grid>
                </Slide>
                <Zoom in = {true} style = {{ transitionDelay: '1500ms'}}>
                    <Grid item xs = {10} md = {4} sx = {{margin: "auto", my: 2}}>
                        <img src = {admin} width = "300px"></img>
                    </Grid>
                </Zoom>
            </Grid>
        </Grid>
    );
}