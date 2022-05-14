const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const connectDB = require('./server/database/connection')
const path = require('path');
const app = express();
dotenv.config({path:'config.env'})

const port = process.env.PORT || 3000
//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body parser
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use('/css',express.static(path.resolve(__dirname,"Asset/css")))
app.use('/img',express.static(path.resolve(__dirname,"Asset/img")))
app.use('/js',express.static(path.resolve(__dirname,"Asset/js")))
//if we want to templet engine  specific path then use bellow method.
//app.set("views",path.resolve(__dirname,"view/ejs"))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(port,()=>{
  console.log(`Your Server is running on ${port}.`)
});
