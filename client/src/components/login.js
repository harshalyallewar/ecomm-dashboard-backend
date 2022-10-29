import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Avatar,
  Checkbox,
  Link,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const Login = () => {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const dispatch = useDispatch();

  let authuser = localStorage.getItem("user");

  if (authuser) {
    navigate("/");
  }

  const getdata = async (e) => {
    e.preventDefault();

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      setErrmsg("Enter valid email");
      setErr(true);

      return;
    }
    dispatch(showLoading());
    let result = await fetch("http://localhost:10/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    dispatch(hideLoading());

    result = await result.json();
    let auth = result.auth;
    console.log(result);

    if (result.success == "true") {
      localStorage.setItem("user", await JSON.stringify(result.data));
      localStorage.setItem("token", await JSON.stringify(result.auth));
      setErr(false);
      navigate("/");
    } else {
      setErr(true);
      setErrmsg(result.result);
    }
  };

  const handleClose = () => {
    setErr(false);
  };

  return (
    // <div className="container">
    //   <form className="loginform">
    //     <h2>Login</h2>
    //     <input
    //       className="email inputBox"
    //       placeholder="Enter the Email"
    //       type="text"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       className="password inputBox"
    //       placeholder="Enter the password"
    //       type="password"
    //       onChange={(e) => setPass(e.target.value)}
    //     />

    //     <button className="submitbtn" onClick={getdata}>
    //       Login
    //     </button>
    //   </form>
    // </div>

    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "82vh",
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        elevation={10}
        sx={{
          maxWidth: "350px",
          maxHeight: "500px",
          p: 4,
          pt: 2,
          borderRadius: 4,
        }}
      >
        <Grid container sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Typography
              variant="h5"
              sx={{ fontSize: 30, fontWeight: "700", letterSpacing: 1, mb: 3 }}
            >
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              label="Enter Email"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              onChange={(e) => setPass(e.target.value)}
              label="Enter Password"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ m: 1 }}>
            <Button onClick={getdata} variant="contained" size="large">
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={err}
        onClose={handleClose}
      >
        <Alert severity="error">{errmsg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
