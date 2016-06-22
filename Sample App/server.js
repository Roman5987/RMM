// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');
var mongojs = require('mongojs');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost:27017/tasks');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
    
// define model =================
var Task = mongoose.model('Task', {
    taskName: String,
    assignee: String,
    due_date: String,
    creation_date: {type: Date, default: Date.now},
    text_alerts: String,
    phone_number: Number,
    description: String,
});

// get all tasks
app.get('/api/tasks', function (req, res) {

    // use mongoose to get all projects in the database
    Task.find(function (err, tasks) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(tasks); // return all projects in JSON format
    });
});
// create project and send back all projects after creation

app.post('/api/tasks', function (req, res) {

    // create a project, information comes from AJAX request from Angular
    Task.create({
        taskName: req.body.taskName,
        assignee: req.body.assignee,
        due_date: req.body.due_date,
        creation_date: req.body.creation_date,
        text_alerts: req.body.text_alerts,
        phone_number: req.body.phone_number,
        description: req.body.description,
        done: false
    }, function (err, tasksdb) {
        if (err)
            res.send(err);

        // get and return all the projects after you create another
        Task.find(function (err, tasks) {
            if (err)
                res.send(err)
            res.json(tasks);
        });
    });

});

app.delete('/api/tasks/:task_id', function (req, res) {
    Task.remove({
        _id: req.params.task_id
    }, function (err, task) {
        if (err)
            res.send(err);

        // get and return all the tasksdb after you create another
        Task.find(function (err, tasks) {
            if (err)
                res.send(err)
            res.json(tasks);
        });
    });
});



// application ==============================================
app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(3000);
console.log("App listening on port 3000");
