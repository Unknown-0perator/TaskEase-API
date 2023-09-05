const knex = require('knex')(require('../knexfile'));
const express = require('express');
const router = express.Router();
const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const {JWT_SECRET} = process.env;

const authorize = (req, res, next) => {
    const authToken = req.headers.authorization
    if(!authToken) {
        return res.status(401).json({message:"No token found"})
    }
    jwt.verify(authToken,JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(403).json({message: `Invalid Token ${err}`});
        } else{
            req.payload = decoded;
        }
        next();
    })
}

router.post('/login', (req, res)=>{
    const {email, password} = req.body;

    knex.select('email', 'password').where({email: email}).then((response)=>{
        const user = response[0];
        if (!user){
            res.status(403).json({ token: null, message: `Invalid email` });
        } else {
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    let token = jwt.sign({ email: user.email }, JWT_SECRET);
                    res.status(200).json({
                    token: token,
                    message: `Logged In`,
                    user
                });
                } else{
                    res.status(403).json({ token: null, message: `Wrong password.` });
                }
            })
        }
    })
})

router.get('/profile', authorize, (req, res) => {
    knex('users').where({ email: req.payload.email })
        .then((response) => {
            res.status(200).json(response[0]);
        })
        .catch(err => res.status(403).send(`Forbidden: ${err}`))
});