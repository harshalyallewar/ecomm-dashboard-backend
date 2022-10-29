import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import Signup from './components/signup';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/updateProduct';
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "./redux/alertsSlice";

import { Box, CircularProgress } from "@mui/material";


function App() {
  const {loading} = useSelector(state=>state.alerts);

  return (
    <div>
      <BrowserRouter>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              backgroundColor: "rgba(0, 0, 0, 0.704)",
              zIndex:'9999'
            
            }}
          >
            <CircularProgress size={70} />
          </Box>
        )}
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/update/" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>logout componment</h1>} />
            <Route path="/profiles" element={<h1>profiles componment</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
