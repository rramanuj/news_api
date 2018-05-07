// =======================
// get the packages we need ============
// =======================
var cookieParser = require('cookie-parser')
var userController = require('./controllers/userController');
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User = require('./app/models/user'); // get our mongoose model
var routes = require('./routes');
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
//app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:8080");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//so everything that involves our API //specifically our CRUD functionality, just so we can distinguish the 
//routes that involve our CRUD functions. 
app.use('/api', routes);
// use it before all route definitions, allows front end vue app to talk to localhost (chrome disabled this by default)
//app.use(cors({origin: 'http://localhost:8080'} ));
app.use(cors({
    origin: "http://localhost:8080/#/",
    credentials: true
}))
// =======================
// start the server ======
// =======================*/
app.listen(port);
console.log('Magic happens at http://localhost:' + port);