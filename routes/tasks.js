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
            'flexible', 
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
            'poster_id', 
            'users.first_name as poster_fname', 
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


router.get('/:taskId/comments', (req, res) => {
    const {taskId} = req.params;
    knex
        .select(
            'comment_id',
            'comment_text',
            'timestamp',
            'task_id',
            'comments.user_id',
            'first_name',
            'last_name'
        )
        .from('comments')
        .join('users', 'comments.user_id','users.user_id')
        .where({task_id:taskId}).then((comment)=>{
            res.status(200).json(comment)
        })
        .catch(err=>{
        res.status(400).send(`Invalid task ID ${err}`)
        })
})


router.put('/:id', (req,res)=>{
    
})

router.post('/',(req, res)=>{

    const newTask = {
        task_id: uuid(),
        title: req.body.title,
        description: req.body.description,
        budget: req.body.budget,
        type: req.body.type,
        status: 'Open',
        latitude: 37.123456,
        longitude: -121.654321,
        date: req.body.date,
        time: req.body.time,
        flexible: req.body.flexible,
        poster_id: req.body.poster_id,
        helper_id: null,
      }

      knex('tasks').insert(newTask).then((newTask)=>{
        return res.status(201).json(newTask)
    }).catch((err)=>{
        res.status(400).json(`Invalid: ${err}`)
    })

})

module.exports = router;