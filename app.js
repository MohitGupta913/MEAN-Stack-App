var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);
//mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://test:test@ds147052.mlab.com:47052/mean_stack');

//
mongoose.connection.on('connected',function(){
    console.log('Connected to Database '+config.database);
});

mongoose.connection.on('error',function(err){
    console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');

//port number
const port = process.env.PORT || 8080;

//cors middleware
app.use(cors());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

// Paspport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//index route
app.get('/',function(req,res){
    res.send('Invalid Endpoint');
});

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start Server
app.listen(port,function(){
    console.log('Server started on port '+port);
});
