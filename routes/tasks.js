const knex = require('knex')(require('../knexfile'));
const express = require('express')
const router = express.Router();
const { v4: uuid } = require('uuid');


router.get('/', (req, res) => {

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
            'budget',
            'user_image',
        )
        .from('tasks')
        .join('users', 'tasks.poster_id', 'users.user_id')
        .then((task) => {
            res.status(200).json(task)
        }).catch(err => {
            res.status(400).send(`Invalid request ${err}`)
        })
})

router.get('/:taskId', (req, res) => {

    const { taskId } = req.params;

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
            'helper_id',
        )
        .from('tasks')
        .join('users', 'tasks.poster_id', 'users.user_id')
        .where({ task_id: taskId }).then((task) => {
            res.status(200).json(task)
        })
        .catch(err => {
            res.status(400).send(`Invalid task ID ${err}`)
        })

})

router.get('/:taskId/offer', (req, res) => {

    const { taskId } = req.params;

    knex
        .select(
            'offer_id',
            'task_id',
            'offers.user_id',
            'offer_amount',
            'timestamp',
            'users.first_name',
            'users.last_name',
            'users.user_image',
        )
        .from('offers')
        .join('users', 'offers.user_id', 'users.user_id')
        .where({ task_id: taskId }).then((offer) => {
            res.status(200).json(offer)
        })
        .catch(err => {
            res.status(400).send(`Invalid task ID ${err}`)
        })

})

router.post('/:taskId/offer', (req, res) => {
    const { taskId } = req.params;
    const newOffer = {
        offer_id: uuid(),
        task_id: taskId,
        user_id: req.body.user_id,
        offer_amount: req.body.offer_amount,
        timestamp: Date.now(),
    }

    knex('offers').insert(newOffer).then((newOffer) => {
        res.status(201).json(newOffer)
    }).catch((err) => {
        res.status(400).json(`Invalid: ${err}`)
    })
})

router.delete('/:taskId/offer/:offerId', (req, res) => {
    const { taskId, offerId } = req.params;
    knex('offers').where({ task_id: taskId }).andWhere({ offer_id: offerId }).del().then(() => {
        res.status(204)
    }).catch(() => {
        res.status(400).json({ message: `Error withdrawing offer` })
    })

})


router.get('/user/:userId', (req, res) => {
    const { userId } = req.params
    knex('tasks').where({ poster_id: userId }).then(tasks => {
        res.status(200).json(tasks)
    }).catch(err => {
        res.status(400).send(`Invalid user ID ${err}`)
    })
})

router.put('/:id', (req, res) => {

})

router.post('/', (req, res) => {

    const newTask = {
        task_id: uuid(),
        title: req.body.title,
        description: req.body.description,
        budget: Number(req.body.budget),
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

    knex('tasks').insert(newTask).then((newTask) => {
        return res.status(201).json(newTask)
    }).catch((err) => {
        res.status(400).json(`Invalid: ${err}`)
    })

})

module.exports = router;