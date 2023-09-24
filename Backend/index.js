
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const db = require('./models/index');
const restaurantRouter = require('./routes/restaurant.route');
const userRouter = require('./routes/user.route');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to the Restaurant Listing Platform'
    });
})

app.use('/api/v1/restaurant', restaurantRouter);

app.use('/api/v1/user', userRouter);

app.all('*', (req, res) => {
    res.status(404).send({
        error: 'Invalid Url Detected'
    })
})


db.sequelize.sync().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}).catch(err => {
    console.log(err);
})