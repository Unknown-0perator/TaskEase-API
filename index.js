const express = require('express');
const app = express();


require('dotenv').config();

const cors = require('cors');

const {CORS_ORIGIN} = process.env;


const PORT = process.env;

const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

// middleware
app.use(cors({origin: CORS_ORIGIN}));
app.use(express.static('public'));
app.use(express.json());
app.use('/task',taskRoutes);
app.use('/user', userRoutes);
app.use(express.json());


//routes
app.get('/',(req, res) => {
    res.send('<h1>Hello</h1>')
}
)

app.listen(PORT, () => {
    console.log('hello world')
})
