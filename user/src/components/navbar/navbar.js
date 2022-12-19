import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../userContext";
// import { AdminContext } from "../adminContext";
import "./navbar.css";
import { AppBar, Container, Toolbar, Box, Menu, MenuItem, IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Navbar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const {user} = useContext(AuthContext);
    // const {admin} = useContext(AdminContext);
    const navigate = useNavigate();

    const pages = user ? ["Overview", "Positions", "Companies", "Admins"] : ["Sign up", "Login"];
    const icons = user ? [<VisibilityIcon sx = {{mr: 1}}/>, <EngineeringIcon sx = {{mr: 1}}/>, <BusinessIcon sx = {{mr: 1}} />, <AdminPanelSettingsIcon sx = {{mr: 1}} /> ] : [<PersonAddAltIcon sx = {{mr: 1}} />, <LoginIcon sx = {{mr: 1}} />];

    const handleLogout = () => {
        signOut(auth);
        navigate("/");
    }

    const createLink = (link) => {
        navigate(link);
    }

    return (
        <AppBar position = "static" sx = {{opacity: "0.8"}}>
            <Container maxWidth = "xl">
                <Toolbar disableGutters>
                    <AdbIcon sx = {{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    {window.innerWidth > 768 ? <Link 
                        to = "/"
                        style = {{textDecoration: "none", color: "white", fontSize: "1.2rem", marginRight: "10px"}}
                    >
                        Outsorcing CO
                    </Link> : null }
                    <Box sx = {{display: { xs: "none", md: "flex" }, marginLeft: "auto"}}>
                        {pages.map((page, index) => (
                            <IconButton key = {page} sx = {{color: "white", borderRadius: "5px", mr: 2}} onClick = {() => createLink("/" + page.toLowerCase().replace(" ", ""))}>
                                {icons[index]} {page}
                            </IconButton>
                        ))}
                    </Box>
                    <Box sx = {{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size = "large"
                            aria-label = "account of current user"
                            aria-controls = "menu-appbar"
                            aria-haspopup = "true"
                            onClick = {handleOpenNavMenu}
                            color = "inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id = "menu-appbar"
                            anchorEl = {anchorElNav}
                            anchorOrigin = {{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin = {{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open = {Boolean(anchorElNav)}
                            onClose = {handleCloseNavMenu}
                            sx = {{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                        {pages.map((page, index) => (
                            <MenuItem key = {page} sx = {{color: "black", borderRadius: "5px"}} onClick = {() => createLink("/" + page.toLowerCase().replace(" ", ""))}>
                                    {icons[index]} {page}
                            </MenuItem>
                        ))}
                        </Menu>
                        <IconButton fontSize = "large" sx = {{display: "flex", marginLeft: "auto"}}>
                            <Link to = "/" style = {{color: "white"}}>
                                <HomeIcon />
                            </Link> 
                        </IconButton>
                    </Box>
                    {user && user.emailVerified && 
                    <IconButton sx = {{color: "white"}} onClick = {handleLogout}>
                        <LogoutIcon sx = {{mr: 1}}/>
                        Logout
                    </IconButton>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}