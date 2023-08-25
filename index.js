const express = require('express');
const app = express();


require('dotenv').config();

const cors = require('cors');

const {CORS_ORIGIN} = process.env;
app.use(cors({origin: CORS_ORIGIN}));

const PORT = process.env;

const taskRoutes = require('./routes/tasks');

app.use('/task',taskRoutes);

app.use(express.json());

app.get('/',(req, res) => {
    res.send('<h1>Hello</h1>')
}
)

app.listen(PORT, () => {
    console.log('hello world')
})
