var express = require('express');
//var fs = require('fs');
var router = express.Router();
//var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) { // when at root, send back this file
  res.render('index', { title: 'Express' });
});

var users = [{
    username: 'Justin and Mason',
    monsterHealth: 500,
    userLevel: 5001,
    monsterCounter: 0,
    experience: 60,
    tasks: [{
        "text": "Create the best CS 260 Project in the world",
        "complete": true
      },
      {
        "text": "Type your username in the save section to save your progress",
        "complete": false
      },
      {
        "text": "If you have saved progress, type your username in the load section to load your progress",
        "complete": false
      },
      {
        "text": "Go to /users to see all of the users in our API REST service and the progress they have made",
        "complete": false
      },
      {
        "text": "Press clear to reset all values and start your own path to completing your goals!",
        "complete": false
      },
    ]
  },
  {
    username: 'justintunev7',
    monsterHealth: 1,
    userLevel: 6000,
    monsterCounter: 2,
    experience: 100,
    tasks: [{
        "text": "Become the highest scorer on GAME-TODO",
        "complete": true
      },
      {
        "text": "Dress with style",
        "complete": true
      },
      {
        "text": "Get an A in CS260",
        "complete": true
      },
      {
        "text": "Get married",
        "complete": true
      },
      {
        "text": "Have a baby",
        "complete": false
      },
    ]
  }
];

/* GET home page. */
//router.get('/', function(req, res, next) {
//   res.sendFile('index.html', { root: 'public' });
//});

router.get('/users', function(req, res) {
  console.log("In Users");
  res.send(users);
});

router.post('/users', function(req, res) {
  console.log("In Users Post");
  console.log(req.body);
  users.push(req.body);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;
