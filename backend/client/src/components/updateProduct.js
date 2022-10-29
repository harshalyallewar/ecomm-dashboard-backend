import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const UpdateProduct = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCat] = useState("");
  const [company, setCom] = useState("");

  console.log(name,price,category,company);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(()=>{
    if (!id) {
      navigate("/");
    }
    
    getProductDetails();
  },[])
  
  
  
  const getProductDetails = async ()=>{
    dispatch(showLoading());
        let product = await fetch(`http://localhost:10/getProduct/${id}`, {
          headers: {
            authorization: `bearer ${await JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        dispatch(hideLoading());
        product = await product.json();
        setName(product.name);
        setPrice(product.price);
        setCat(product.category);
        setCom(product.company);
  } 

  const updateProduct = async (e)=>{
        e.preventDefault();
        let user = await JSON.parse(localStorage.getItem("user"));
        let userId = user._id;

        let result = await fetch(`http://localhost:10/updateProduct/${id}`, {
          method: "PUT",
          body: JSON.stringify({ name, price, category, userId, company }),
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${await JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        

        result = await result.json();
        
        if(result){
          navigate("/");
        }
        
    }

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
              Update Product
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Enter the Product Name"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Enter the Product Price"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              value={category}
              onChange={(e) => setCat(e.target.value)}
              label="Enter the Product Category"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              value={company}
              onChange={(e) => setCom(e.target.value)}
              label="Enter the Product Company"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Button onClick={updateProduct} variant="contained" size="large">
              Update Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
