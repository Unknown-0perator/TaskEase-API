const knex = require('knex')(require('../knexfile'));
const express = require('express');
const router = express.Router();
const {v4:uuid} = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();


const jwt = require('jsonwebtoken');
const authorize = (req, res, next) => {

    const authToken = req.headers.authorization

    if(!authToken) {
        return res.status(401).json({message:"No token found"})
    }

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: 'The token is expired or invalid'});
        }
        req.jwtPayload = decoded;
        next();
    })
}


const SECRET_KEY = process.env.JWT_SECRET;

router.post('/sign-up',(req, res)=>{


    const plainPassword = req.body.password;
    bcrypt.hash(plainPassword, 20).then(hashPassword=>{
        const newUser = {
            id: uuid(),
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email: req.body.email,
            password: hashPassword
        }
        console.log(newUser)
        knex('user').insert(newUser).then((newUser)=>{
            return res.status(201).json(newUser)
        }).catch((e)=>{
            console.log(e)
        })
    })
    
})



router.post('/login', (req, res) => {

    const {email, password} = req.body;

    knex('user').select('email','password').then((users)=>{
        users.map(user=>{
            if(user.email===email){
                bcrypt.compare(password, user.password, (err, result)=>{
                    if(result){
                        knex('user').where({email:email}).then(user=>{
                            let token = jwt.sign({ email: user.email }, SECRET_KEY);
                res.status(200).json({
                    token: token,
                    message: `Successful login.`,
                    user
                });
                        })

                    }else{
                        console.log('wrong password')
                    }
                })
            } 
        })
    })

})

router.get('/profile', authorize, (req, res) => {
    knex('users').where({ email: req.payload.email })
        .then(response => {
            console.log(response[0])
            res.status(200).json(response[0]);
        })
        .catch(err => res.status(403).send(err))
});




module.exports = router;