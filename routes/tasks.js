const knex = require('knex')(require('../knexfile'));
const express = require('express')
const router = express.Router();
const {v4: uuid} = require('uuid');


router.get('/', (req, res)=>{

    knex('task').then((task)=>{
        res.json(task)
    })

})

router.get('/:id',(req, res)=>{

})

router.put('/:id', (req,res)=>{
    
})

router.post('/',(req, res)=>{

})

module.exports = router;