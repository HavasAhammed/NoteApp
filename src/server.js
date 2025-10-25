require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Note = require('./models/note');
const { STATUS_CODES } = require('node:http');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

// Allow local access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Database Connection
// const mongoDbPath = "mongodb+srv://havasahammedt33_db_user:alikhan559@cluster0.udowshh.mongodb.net/?appName=Cluster0";
const mongoDbPath = process.env.MONGO_URI
mongoose.connect(mongoDbPath)
    .then(() => {
        console.log('Connected to MongoDB');

        // Routes
        app.get('/', (req, res) => {
            const response = { statusCode : res.statusCode, message: 'API is running...' };
            res.json(response);
        });

        const noteRouter = require('./routes/Note');
        app.use("/notes", noteRouter);


        // Start the server
        const PORT = process.env.PORT || port;
        app.listen(PORT, () => {
            console.log('Server is running on PORT:', PORT);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));