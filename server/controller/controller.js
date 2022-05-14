var Userdb = require("../model/model");

// create and save new user
exports.create = (req,res) =>{
    //validatae request
    if(!req.body){
        res.status(400);
    }

    //new user
    const user = Userdb({
        firstname:req.body.name,
        lastname:req.body.lname,
        email:req.body.email,
        mobile:req.body.mobileNumber,
        hobby:req.body.hobby,
        gender:req.body.gender,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    })


    //save user in the database
    user
    .save(user)
    .then(data =>{
        res.redirect("/")
    })
    .catch(err =>{
        res.status(500).send({messgae:err.messgae || "Some error occured while creating a create operations "});

    });

}

//retrive and return all users/ return a single user

exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data =>{
           if(!data){
               res.status(404).send({message:"NOt found user with id"+id})
           } else{
               res.send(data)
           }
        })
        .catch(err=>{
            res.status(500).send({message:"error retriving user with id:"+id})
        })

    }else{
        Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err =>{
        res.status(500).send({message:err.message || "Error occured while retriving user information"})

    })

    }


    
        
    

}

//update a new idetified users by user id

exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>{
        if(!data){
            res.status(404).send({message:`cannot Update user with ${id}.maybe user not found`})

        }else{
            console.log(data)
           res.send(data) 
        }
    })
    .catch(err =>{
        res.status(500).send({message:"Error update user information"})
    })

}

exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message : "User was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });

}