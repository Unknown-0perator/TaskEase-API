const knex = require('knex')(require('../knexfile'));
const express = require('express');
const router = express.Router();
const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/sign-up',(req, res)=>{
    
    knex('users').where({email:req.body.email}).then(response=>{
        const user = response[0];
        if(!user){
            const plainPassword = req.body.password;
            bcrypt.hash(plainPassword, 1).then(hashPassword=>{
                const newUser = {
                    user_id: uuid(),
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashPassword
                }
                knex('users').insert(newUser).then((newUser)=>{
                    return res.status(201).json(newUser)
                }).catch((err)=>{
                    res.status(400).json(`Invalid: ${err}`)
                })
            })
        } else{
            res.status(400).json(`User Already Exist`)
        }
    })
    
    
})





module.exports = router;