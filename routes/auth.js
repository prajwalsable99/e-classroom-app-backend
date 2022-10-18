const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose;

const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const router = express.Router();

// create user using post @ ".api/auth/". no require of authentication 

const user = require('../models/User');


router.post(
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

            user = await User.create({

                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).then(user => { res.json(user) })
        } catch (error) {
                console.error(error.message);
                res.status(500).send("kuch to gadbad hai");
        }

    }
)


module.exports = router