const knex = require('knex')(require('../knexfile'));
const express = require('express')
const router = express.Router();
const {v4: uuid} = require('uuid');


router.get('/', (req, res)=>{

    knex.select('id', 'title', 'location', 'type', 'status','date', 'budget').from('task').then((task)=>{
        res.json(task)
    })

})

router.get('/:taskId',(req, res)=>{
    const {taskId} = req.params;

    knex('task').where({id:taskId}).then((task)=>{
        res.json(task)
    })

})

router.put('/:id', (req,res)=>{
    
})

router.post('/',(req, res)=>{

})

module.exports = router;