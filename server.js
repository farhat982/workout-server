const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());

app.use(express.json());
//middleware
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

//app.use(express.urlencoded({ extended: false }))

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to mongodb
mongoose.connect(process.env.REACT_APP_MONGO, () => {
	console.log('MongoDB database is connected'.cyan.underline);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`.magenta.underline);
});
