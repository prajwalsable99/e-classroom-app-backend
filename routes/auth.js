const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose;

const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const router = express.Router();

// security 
var brcypt=require('bcryptjs');

//signature
const jwt=require('jsonwebtoken');
const JWT_TOKEN_SEC_KEY="PrajwaLSable";

const user = require('../models/User');


const fetchUser=require('../middleware/fetchuser')

router.post(

    // end ponint 1 
    '/createUser',
    //-----------------------------------------------------------
    [
        body('name').isLength({ min: 3 }),
        body('email').isEmail(),
        body('password').isLength({ min: 4 })

    ],
    //-----------------------------------------------------------
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "user already exist" })
            }
            
            const salt= await brcypt.genSalt(10);
            
            let secPass= await brcypt.hash(req.body.password,salt);

            

            user = await User.create({

                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            // .then(user => { res.json(user) })
            const userdata={
                user:{
                    id:user.id
                }
            }
            const jwtToken=jwt.sign(userdata,JWT_TOKEN_SEC_KEY);
            // console.log(jwtToken);

            res.send({jwtToken : jwtToken});
        } 
        catch (error) {
                console.error(error.message);
                res.status(500).send("kuch to gadbad hai");
        }

    }
)

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


router.post(

    // end ponint 2
    '/Login',
    //-----------------------------------------------------------
    [
        
        body('email').isEmail(),
        body('password').exists()

    ],
    //-----------------------------------------------------------
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {


            const {email,password}=req.body;
            let user = await User.findOne({email});
            if(!user){

                return res.status(400).json({error:"invalid credentials"});
            }

            // check if valid email as well as password

            const passComp= await brcypt.compare(password,user.password);

            if(!passComp){
                return res.status(400).json({error:"invalid credentials"});
            }

            const Data={
                user:{
                    id:user.id
                }
            }
            const logToken=jwt.sign(Data,JWT_TOKEN_SEC_KEY);
            console.log(logToken);
            res.send({logToken});



            
        } catch (error) {
                console.error(error.message);
                res.status(500).send("kuch to gadbad hai");
        }

    }
)

/// route 3 get user details /post 

router.post(

    // end ponint 2
    '/getUser',
    
    fetchUser,
    
    async (req, res) => {

        
        try {
                let id=req.user.id;
                const user=await User.findById(id).select("-password");
                console.log(user);
                res.send(user);
      
            
        } catch (error) {
                console.error(error.message);
                res.status(500).send("kuch to gadbad hai");
        }

    }
)





module.exports = router