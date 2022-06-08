const {hash} =require ('bcrypt')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

//login User

const login = async (req , res )=>{
    if(!req.body.email){
        return res.status(400).send({
            status : 0,
            message: "email field is required"
        })
    }
    else if(!req.body.password){
        return res.status(400).send({
            status : 0,
            message : "Password field is required"
        })

    }
    else {
        User.find({email : req.body.email})
        .exec()
        .then(user =>{
            if(user.length<1){
                return res.status(400).send({
                    status: 0,
                    message : "email not found"
                })                                                 
            }
            else{
                bcrypt.compare(req.body.password, user[0].password, (err , result) =>{
                    if(err){
                        return res.status(400).send({
                            status : 0,
                            message: "Auth Failed"
                        })
                    }
                    if(result){
                        const token = jwt.sign(
                        {
                            email : user[0].email,
                            userId : user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "24hr"
                        })

                        return res.status(200).send({
                            status : 1,
                            message: "user logged in",
                            token: token,
                            data : user[0]

                        })


                    }
                    return res.status(400).send({
                        status: 0, 
                        message: 'Incorrect password.'
                })
                 
                });
                
            }
        
        })
        .catch(err => {
            res.status(400).send({
                status : 0,
                message : err
            })
        })
    }
}

// register User

const registration = async(req,res) =>{
    if(!req.body.name){
        res.status(400).send({
            status : 0,
            message : "name is required"
        })
    }
    else if(!req.body.email){
        res.status(400).send({
            status : 0,
            message : "email is required"
        })
    }
    else if(!req.body.password){
        res.status(400).send({
            status : 0,
            message : "password is required"
        })
    }
    else{
        User.find({email : req.body.email})
        .exec()
        .then(user =>{
            if(user.length >= 1){
                res.status(400).send({
                    status:0,
                    message : "email already exist"
                })
            }
            else{
                bcrypt.hash(req.body.password , 10 , (err , hash) => {
                    if(err){
                        res.status(400).send({
                            status : 0,
                            message : err
                        })
                    }
                    else{
                        const user = new User
                        user.name = req.body.name
                        user.email = req.body.email
                        user.password = hash
                        user.save()
                        res.status(200).send("user registered")

                    }
                })
            }
        })
        .catch(err =>{
            res.status(400).send({
                status : 0,
                message: err
            })
        })
    }
}

module.exports = {
   login,
   registration
}