const express = require('express');
const route = express.Router()
const services=require("../services/render")
const controller = require("../controller/controller")
const jwt = require('jsonwebtoken');
/***
 * 
 * @description Root Route
 * @method GET/
 * 
 * 
 */

route.get('/',controller.loginget)

route.post('/',controller.loginPost)

/***
 * 
 * @description Root Route
 * @method GET/user
 * 
 * 
 */

route.get('/user',services.homeRoutes);
/***
 * 
 * @description addUser Route
 * @method GET/
 * 
 * 
 */

route.get('/add-user',services.add_user);
/***
 * 
 * @description updateUser Route
 * @method GET/
 * 
 * 
 */
route.get('/update-user',services.update_user)

//API
route.post("/api/users",controller.create)
route.get("/api/users",controller.find)
route.put("/api/users/:id",authenticateToken,controller.update)
route.delete("/api/users/:id",authenticateToken,controller.delete)
route.get("/api/logut",(req,res) =>{
  res.cookie('token',' ',{
      httpOnly: true
  });
  res.redirect("/");
})


function authenticateToken(req, res, next) {
  
    const authHeader = req.headers['cookie']

    const token = authHeader && authHeader.split('=')[1]
    
    if (token == null){
      console.log("inNull");
      return res.sendStatus(401)

    } 
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err){
        return res.sendStatus(403)
        console.log("In error");

      } 
      
      next()
    })
  }
module.exports = route  




  