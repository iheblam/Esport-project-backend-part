//configs
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//requests

router.post("/register", async (req, res) => {
  data = req.body;
  usr = new User(data);
  salt = bcrypt.genSaltSync(10);
  cryptedpass = await bcrypt.hashSync(data.password, salt);
  usr.password = cryptedpass;
  usr
    .save()
    .then((saveduser) => {
      res.send(saveduser);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", async (req, res) => {
  data = req.body;

  user = await User.findOne({ email: data.email });

  if (!user) {
    res.send("email or password invalid");
  }
   else {
    validpass = bcrypt.compareSync(data.password, user.password);
    if (!validpass) {

      res.send("email or password invalid");
    } 
    else {

      payload = { 
        _id: user.id,
        email: user.email,
        name: user.name,
      };
      
      token = jwt.sign(payload, "1234567");
      res.status(200).send({ token: token });
    }
  }

});

router.get("/getall", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  myid = req.params.id;
  User.findById(myid)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/update/:id", (req, res) => {
  id = req.params.id;
  newdata = req.body;
  User.findByIdAndUpdate({ _id: id }, newdata)
    .then((updateduser) => {
      res.send(updateduser);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  myid = req.params.id;
  User.findByIdAndDelete(myid)
    .then((deleteduser) => {
      res.send(deleteduser);
    })
    .catch((err) => {
      console.log("err");
    });
});

//exports

module.exports = router;
