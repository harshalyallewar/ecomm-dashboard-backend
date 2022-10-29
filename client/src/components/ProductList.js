import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Table,
  makeStyles,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

const ProductList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [list,setList] = useState([]);
    
    useEffect(() => {
      console.log("useffect called");
      fetchproducts();
      
    }, []);

    
    const fetchproducts = async ()=>{
      dispatch(showLoading());
      let user = await JSON.parse(localStorage.getItem("user"));
      console.log(user);
      let result = await fetch(`http://localhost:10/productList/${user._id}`,{
        headers: {
            authorization: `bearer ${await JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();

      setList(result);
      dispatch(hideLoading());
    }
    

    const deleteProduct = async (id)=>{
      dispatch(showLoading());
      let result = await fetch(`http://localhost:10/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${await JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      });

      fetchproducts();
      dispatch(hideLoading());
    }

    const searchProduct = async (e)=>{
      console.log("searchProduct called");
      let result = await fetch(`http://localhost:10/search/${e.target.value}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${await JSON.parse(
            localStorage.getItem("token")
          )}`
        }
      });
      result = await result.json();
      
      if(result){
        setList(result);
      } else {
        fetchproducts();
      }

    }


  return (

    <Container>
      <Paper sx={{ m: 4 }}>
        <TableContainer sx={{ maxHeight: 542 ,minHeight:538}}>
          <Table sx={{ p: 2 }} stickyHeader>
            <TableHead>
              <TableRow hover>
                <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             {list.length > 0 ? (
            list.map((item, index) => {
              return (
                <TableRow key={item.name + index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        fontWeight: "550",
                        letterSpacing: 1,
                        textTransform: "none",
                        mr:1
                      }}
                      variant="contained"
                      onClick={() => deleteProduct(item._id)}
                      className="deletebtn"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        fontWeight: "550",
                        letterSpacing: 1,
                        textTransform: "none",
                      }}
                      onClick={() => {
                        navigate(`/update/${item._id}`);
                      }}
                      className="updatebtn"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>
                <h2>Result Not found</h2>
              </TableCell>
            </TableRow>
          )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default ProductList;
