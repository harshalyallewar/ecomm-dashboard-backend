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

const Signup = () => {
  const dispatch = useDispatch();

  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const navigate = useNavigate();

  const showdata = async (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
          setErrmsg("Enter all details");
          setErr(true);
          return;
      }

      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.match(mailformat)) {
        setErrmsg("Enter valid email");
        setErr(true);

        return;
      }

      dispatch(showLoading())

      let result = await fetch("http://localhost:10/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      dispatch(hideLoading())

      let final = await result.json();
      console.log(final, final.success);
      if (final.success == "true") {
        console.log("this is true if else condition");
        localStorage.setItem("user", JSON.stringify(final.result));
        localStorage.setItem("token", JSON.stringify(final.auth));
        navigate("/");
      } else {
        console.log("this is false if else condition");
        setErr(true);
        setErrmsg(final.result);
      }
    }

    const handleClose = ()=>{
      setErr(false);
    }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (

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
              Register
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              required
              label="Enter Username"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              required
              label="Enter Password"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setPass(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              required type='email'
              label="Enter Email"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Button onClick={showdata} variant="contained" size="large">
              Register
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
        <Alert severity="error">
         {errmsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
