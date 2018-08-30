const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const ride = require('./controllers/rideMyWay');
const config = require('./config/config').get(process.env.NODE_ENV);

const options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};



const app = express();
mongoose.connect(config.url, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//server to look for static files in the public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Invalid page');
});

app.use('/rides', ride);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});

module.exports = app;