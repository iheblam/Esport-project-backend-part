const express=require("express");
const router=express.Router();
const Product=require("../models/product")


router.post("/addproduct", (req, res) => {
    data = req.body;
    console.log(data);
    prod = new Product(data);
    prod.save()
      .then((savedprod) => {
        res.send(savedprod);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  router.get("/getprod", (req, res) => {
    Product.find()
    .then((prod) => {
      res.send(prod);
    })
    .catch((err)=>{
      console.log(err)
    })
  });




module.exports=router