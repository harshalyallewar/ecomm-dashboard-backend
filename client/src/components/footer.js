import react from "react";
import { Link } from "react-router-dom";
import {Paper, AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MenuIcon from "@mui/icons-material/Menu";

function Footer() {
  return (
    // <div className="footer">
    //   <h2>E-comm Dashboard</h2>
    // </div>
    <Paper sx={{ position: "relative" }}>
      <AppBar sx={{ px: 10, position: "relative" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CopyrightIcon sx={{ p: 1, fontSize: { xs: 20, sm: 27 } }} />
            <Typography variant="h6" sx={{ fontSize: {xs:14,sm:18} }}>
              E-comm Dashboard
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

export default Footer;
