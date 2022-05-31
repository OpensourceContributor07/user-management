const mongoose = require("mongoose");
var loginschema  = new mongoose.Schema({
    user:{
        type:String
    },
    pass:{
        type:String
    }
},{ collection : 'logindb' });
const logindb = mongoose.model("logindb",loginschema)
module.exports = logindb