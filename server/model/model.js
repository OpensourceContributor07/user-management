const mongoose = require("mongoose");
var schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true

    }
    ,
    lastname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number.`

        },
        required:[true,"User phone number required"]
        
        

    },
    mobile:{
        type:Number,
        required:true

    },
    hobby:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
});
const Userdb = mongoose.model("Userdb",schema);
module.exports = Userdb;   



