const express = require("express");   //importing express

const ProductRoute=require("./routes/product"); // importing routes
const UserRoute=require("./routes/user");      // importing routes


require("./config/connect");
const app = express();
app.use(express.json()); //make the application inderstand json form

//http://127.0.0.1:3000/
app.use('/product',ProductRoute)
app.use('/user',UserRoute)









app.listen(3000, () => {
  console.log("server work!!");
});
