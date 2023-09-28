const knex = require('knex')(require('../knexfile'));
const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');


// GET COMMENTS

router.get('/task/:taskId', (req, res) => {
    const { taskId } = req.params;
    knex
        .select(
            'comment_id',
            'comment_text',
            'timestamp',
            'task_id',
            'comments.user_id',
            'first_name',
            'last_name',
            'user_image'
        )
        .from('comments')
        .join('users', 'comments.user_id', 'users.user_id')
        .where({ task_id: taskId }).then((comment) => {
            res.status(200).json(comment)
        })
        .catch(err => {
            res.status(400).send(`Invalid task ID ${err}`)
        })
})


// POST COMMENTS

router.post('/', (req, res) => {
    const newComment = {
        comment_id: uuid(),
        comment_text: req.body.comment_text,
        timestamp: Date.now(),
        task_id: req.body.task_id,
        user_id: req.body.user_id
    }
    knex('comments').insert(newComment).then((newComment) => {
        res.status(201).json(newComment)
    }).catch((err) => {
        res.status(400).json(`Invalid: ${err}`)
        console.log(err)
    })
})


module.exports = router;