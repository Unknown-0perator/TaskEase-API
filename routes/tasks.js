const knex = require('knex')(require('../knexfile'));
const express = require('express')
const router = express.Router();
const {v4: uuid} = require('uuid');


router.get('/', (req, res)=>{

    knex
        .select(
            'task_id', 
            'title', 
            'latitude', 
            'longitude', 
            'type', 
            'status',
            'date', 
            'time', 
            'budget'
            )
        .from('tasks')
        .then((task)=>{
            res.status(200).json(task)
        }).catch(err=>{
            res.status(400).send(`Invalid request ${err}`)
        })
})

router.get('/:taskId',(req, res)=>{

    const {taskId} = req.params;
    
    knex
        .select(
            'task_id', 
            'title', 
            'description', 
            'latitude', 
            'longitude', 
            'type',
            'status', 
            'date', 
            'time', 
            'budget',
            'flexible',
            'poster_id', 'users.first_name as poster_fname', 
            'users.last_name as poster_lname', 
            'helper_id'
        )
        .from('tasks')
        .join('users','tasks.poster_id','users.user_id')
        .where({task_id:taskId}).then((task)=>{
            res.status(200).json(task)
        })
        .catch(err=>{
            res.status(400).send(`Invalid task ID ${err}`)
        })

})

router.put('/:id', (req,res)=>{
    
})

router.post('/',(req, res)=>{

})

module.exports = router;