const express = require('express');
const app = express();





require('dotenv').config();

const cors = require('cors');

const {CORS_ORIGIN} = process.env;


const {PORT} = process.env;

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// middleware
app.use(cors({origin: CORS_ORIGIN}));
app.use(express.static('public'));
app.use(express.json());



app.use('/tasks',taskRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
