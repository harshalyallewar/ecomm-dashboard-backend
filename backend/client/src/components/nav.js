import react, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Menu,
  MenuItem
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";

function Nav() {

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    //navigate('/signup');
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e)=>{
    setAnchorEl(e.currentTarget);
  }

  const handleClose = (e)=>{
    setAnchorEl(null);
  }
  const handleCloseForPages = (page)=>{
    navigate('/'+page);
    console.log("/" + page );
    setAnchorEl(null);
  }
  

  return (
    // <div className="nav">
    //   <div className="logo">
    //     <Link to="/">
    //       <img
    //         alt="logo"
    //         className="logoimg"
    //         src="https://www.seekpng.com/png/full/357-3576734_dashboard-icon-blue.png"
    //       />
    //     </Link>
    //     <a className="logotext">Dashboard</a>
    //   </div>
    //   {auth ? (
    //     <ul className="navlinks">
    //       <li>
    //         <Link to="/">Products</Link>
    //       </li>
    //       <li>
    //         <Link to="/add">Add Product</Link>
    //       </li>
    //       <li>
    //         <Link to="/update">Update Product</Link>
    //       </li>
    //       <li>
    //         <Link to="/profiles">Profiles</Link>
    //       </li>
    //       <li>
    //         <Link onClick={logout} to="/login">
    //           Logout
    //         </Link>
    //       </li>
    //     </ul>
    //   ) : (
    //     <ul className="navlinks">
    //       <li>
    //         <Link to="/signup">Sign Up</Link>
    //       </li>
    //       <li>
    //         <Link to="/login">Login</Link>
    //       </li>
    //     </ul>
    //   )}
    // </div>

    <AppBar sx={{ px: { xs: 0, sm: 3, lg: 10 }, position: "relative" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Button>
            <DashboardIcon sx={{ color: "white", fontSize: "45px" }} />
          </Button>

          <Button component="button" sx={{ textTransform: "none" }}>
            <Typography
              component="p"
              px={1}
              variant="h6"
              sx={{ color: "white", fontWeight: "bold", letterSpacing: "1px" }}
            >
              DashBoard
            </Typography>
          </Button>
        </Box>

        <Box sx={{ ml: 7, display: { xs: "none", md: "flex" } }}>
          {auth
            ? [
                <Link key="home" to="/">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Products
                    </Typography>
                  </Button>
                </Link>,

                <Link key="add" to="/add">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Add Product
                    </Typography>
                  </Button>
                </Link>,

                <Link key="update" to="/update">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Update Product
                    </Typography>
                  </Button>
                </Link>,

                <Link key="login" onClick={logout} to="/login">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <PersonIcon sx={{ color: "white" }} />
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Log Out
                    </Typography>
                  </Button>
                </Link>,
              ]
            : [
                <Button
                  key="login"
                  component="button"
                  sx={{ textTransform: "none" }}
                >
                  <Link to="/login">
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Login
                    </Typography>
                  </Link>
                </Button>,

                <Link key="signup" to="/signup">
                  <Button component="button" sx={{ textTransform: "none" }}>
                    <Typography
                      component="p"
                      sx={{ color: "white", fontSize: "17px", px: 1 }}
                      variant="p"
                    >
                      Sign Up
                    </Typography>
                  </Button>
                </Link>,
              ]}
        </Box>

        {/*  Mobile Responsive code below  */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <IconButton onClick={handleOpen}>
            <MenuIcon sx={{ color: "white", fontSize: "34px" }} />
          </IconButton>

          <Paper>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {auth
                ? [
                    <MenuItem
                      key="products"
                      onClick={() => handleCloseForPages("")}
                    >
                      Products
                    </MenuItem>,
                    <MenuItem
                      key="addproducts"
                      onClick={() => handleCloseForPages("add")}
                    >
                      Add Product
                    </MenuItem>,
                    <MenuItem
                      key="updateproducts"
                      onClick={() => handleCloseForPages("update")}
                    >
                      Update Product
                    </MenuItem>,
                    <MenuItem
                      key="logoutproducts"
                      onClick={() => handleCloseForPages("login")}
                    >
                      Log Out
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      onClick={() => handleCloseForPages("login")}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key="signup"
                      onClick={() => handleCloseForPages("signup")}
                    >
                      Sign Up
                    </MenuItem>,
                  ]}
            </Menu>
          </Paper>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          <IconButton sx={{ mr: 0 }}>
            <DashboardIcon sx={{ color: "white", fontSize: "35px" }} />
          </IconButton>

          <Button component="button" sx={{ m: 0, textTransform: "none" }}>
            <Typography
              component="p"
              px={1}
              variant="h6"
              sx={{
                m: 0,
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              DashBoard
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
