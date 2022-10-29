const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

require("./db/config");

const User = require("./db/users");
const Product = require("./db/addProduct");

const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm"

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(await User.find());
});

app.post("/register", async (req, res) => {

  try {
  

  let checkdupli = await User.findOne({email:req.body.email});

  if(checkdupli){
    return res.send({ result: "email is already exist so try another" , success:'false'});
  }
  
   let user = new User(req.body);
   let result = await user.save();
   result = await result.toObject();
   delete result.password;

   Jwt.sign({ result }, jwtKey, { expiresIn: "24h" }, (err, token) => {
     if (err) {
       res.send({ result: "something went wrong", success: "false" });
     } else {
       res.send({ result, auth: token, success: "true" });
     }
   });
  } catch {
    res.send({ result: "something went wrong", success: "false" });
  }


 
  
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
    let data = await User.findOne(req.body).select("-password");
    if (data) {
      Jwt.sign({data}, jwtKey, {expiresIn: "2h"}, (err, token)=>{
        if(err){
            res.send({ result: "something went wrong", success: "false" });
        } else {
            res.send({data, auth: token, success: "true"});
        }
      })
    } else {
      res.send({ result: "No User Found", success: "false" });
    }
  } else {
    res.send({ result: "Enter email & password properly", success: "false" });
  }
  } catch {
    res.send({ result: "something went wrong", success: "false" });
  }
});

app.post("/add-product", tokenVerify, async (req, res) => {
  try {
    let addproduct = new Product(req.body);
  let result = await addproduct.save();
  result = result.toObject();
  // res.send("working");
  res.send(result);
  } catch {
    res.send({result, success:false});
  }
});

app.get("/productList/:id", tokenVerify, async (req, res) => {
  try{
    let productlist = await Product.find({userId:req.params.id});

  if (productlist.length > 0) {
    res.send(productlist);
  } else {
    res.send({ Result: "No Products" });
  }
  } catch(err){
     res.send({ result, success: false });
  }
});

app.get("/getProduct/:id", tokenVerify, async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    res.send(result);
  } catch {
    res.send({ result: "No Record found", success:false });
  }
});

app.delete("/deleteProduct/:id", tokenVerify, async (req, res) => {
  try 
{  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
} catch {
    res.send({result: "No deletion", success: false});
  }
});

app.put("/updateProduct/:id", tokenVerify, async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    res.send(result);
  } catch {
    res.send({ result: "No Update", success: false });
  }
});

app.get("/search/:key", tokenVerify, async (req, res) => {
  try {
    let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });

  res.send(result);
  } catch {
    res.send({ result: "no result", success: false });
  }
});

function tokenVerify(req, res, next){
  try{
    let token = req.headers['authorization'];

  if(token) {
    token = token.split(" ");
    token = token[1];

    Jwt.verify(token, jwtKey, (err, valid)=>{
      if(err){
        res.status(401).send({result:"authorization failed"});
      } else {
        next();
      }
    })
  } else {
      res.status(403).send({result:"please send headers"});
  }
  } catch {
    res.send({ result: "no result", success: false });
  }
}

if(process.env.NODE_ENV==='production'){
  app.use('/', express.static('client/build'));
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './client/build/index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
  console.log("server is listening")
});
