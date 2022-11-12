import React, { useState } from "react";
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
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";


const AddProduct = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCat] = useState("");
  const [company, setCom] = useState("");
  const [error, setError] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  const addProduct = async (e) => {
    console.log(name, price, category, company);
    e.preventDefault();

    let user = await JSON.parse(localStorage.getItem("user"));
    let userId = user._id;

    if (!price) {
      setErrmsg("Enter price properly");
      setError(true);
      return;
    }

    if (!name || !price || !category || !company) {
      setErrmsg("Enter all details");
      setError(true);
      return;
    }

    console.log("add prodcut called");
    dispatch(showLoading());

    let result = await fetch("/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${await JSON.parse(
          localStorage.getItem("token")
        )}`,
      },
    });
    dispatch(hideLoading());
    result = await result.json();
    console.log(result);
    // if (result.success == false) {
    //   localStorage.clear();
    // }

    if (result) {
      navigate("/");
    }
  };

  const handleClose = () => {
    setError(false);
  };

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
          p: {
            xs: 1,
            sm: 3,
          },
          pt: { xs: 0, sm: 1 },
          borderRadius: 2,
          m: {
            xs: 3,
            sm: 0,
          },
        }}
      >
        <Grid container sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: 30,
                fontWeight: "700",
                letterSpacing: 1,
                mb: 3,
              }}
            >
              Add Product
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="Enter the Product Name"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              label="Enter the Product Price"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              onChange={(e) => setCat(e.target.value)}
              label="Enter the Product Category"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              onChange={(e) => setCom(e.target.value)}
              label="Enter the Product Company"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Button onClick={addProduct} variant="contained" size="large">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
        onClose={handleClose}
      >
        <Alert severity="error">{errmsg}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProduct;
