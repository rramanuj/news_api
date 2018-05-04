'use strict';
var express     = require('express');
// get an instance of the router for api routes
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

//A router instance is a middleware and routing system; a mini app.
//Controller Imports
var userController = require('./controllers/userController')

//Check auth token
function isLoggedIn(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, router.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

}
}

// API ROUTES -------------------

// GETS A SINGLE USER FROM THE DATABASE

//route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.route('/authenticate')
.post(function(req,res) {
  userController.authenticate(req,res)
});

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


// route to return all users (GET http://localhost:8080/api/users)
router.route('/users')
.get(function(req,res) {
  userController.getAll(req,res)
})
.post(function(req,res) {
  userController.create(req,res)
});


router.route('/users/:id') 
.get(function (req, res) {
  userController.findById(req,res)
}).delete(function (req, res) {
  userController.delete(req,res)
})
.put(function (req, res) {
  userController.update(req,res)
});


router.route('/scores')
.get(function(req,res) {
  userController.getAllScoresForUser(req,res)
})

/*router.route('/users')
.post(function(req,res) {
  userController.authenticate(req,res)
});

  /*var todoList = require('../controllers/todoListController');
/*app.get('/setup', function(req, res) {

  
//user controller and you list all the uers based of that.

//I CAN'T BELIEVE I DIDN'T GET THIS WTF!

//TODO: CHANGE PROJECTION INTO A COMPLETELY RESTFUL DATABASE SERVICE.

//Side project: Create Grumblr API?

// apply the routes to our application with the prefix /api
//app.use('/api', apiRoutes);
// =======================
// start the server ======
// =======================*/

module.exports = router;
