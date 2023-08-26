const knex = require('knex')(require('../knexfile'));
const express = require('express');
const router = express.Router();
const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
const cors = require('cors');

router.post('/sign-up',(req, res)=>{

    const {SALT_ROUNDS} = process.env

    bcrypt.hash(req.body.password, SALT_ROUNDS).then(hash=>{
        const newUser = {
            id: uuid(),
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email: req.body.email,
            password: hash
        }
        console.log(newUser)
        knex('user').insert(newUser).then((newUser)=>{
            return res.status(201).json(newUser)
        }).catch((e)=>{
            console.log(e)
        })
    })
    
})

module.exports = router;