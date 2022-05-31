const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost:27017/crud').then(()=>{
    console.log("your databse connection conected succesfully");
}).catch(err =>{
    console.log('Could not connect to the database. Exiting now...', err);
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const formSchema = mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        // unique:true
    },
    mobileNumber:{
        type:Number,
        validate:{
            validator:function(val){
                return val.toString().length === 10
            },
            message: val => '${val.value} has to be 10 digits'

        }
    },
    hobby:{
        type:String

    },

    gender:{
        type:String

    },
    password:{
        type:String
    },
    confirmpassword:{
        type:String

    }
});
const form = mongoose.model("form",formSchema);
app.get('/',function(req,res){
    res.render("form",{yourMesaage: 'Manan'});
});
app.post("/",function(req,res){
    var datatorenderonPage = "nothing"
    
    const data = new form({
        fname : req.body.fname,
        lname :req.body.lname,
        email :req.body.email,
        mobileNumber:req.body.mob,
        hobby:req.body.hobby,
        gender:req.body.gender,
        password:req.body.password,
        confirmpassword:req.body.confirmPassword
    });
    data.save(function(err){
        
        if(err){
            console.log(err)
            var error = err
            datatorenderonPage = error
        }else{
            console.log("succesfully save data");
            datatorenderonPage = "Succesfully Saved data"
        }
    }).then()
        
    res.render("form",{yourMesaage:datatorenderonPage})

    
    
});
    app.post('/delete',function(req,res){
        var temp = req.body.search;
        form.deleteOne({email:temp}).then(function(){
            console.log("Data deleted"); // Success
        }).catch(function(error){
            console.log(error); // Failure
        });

        

    });
app.listen(3000,function(req,res){
    console.log("your server is running")
})

