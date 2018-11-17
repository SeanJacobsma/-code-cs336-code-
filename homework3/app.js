var fs = require('fs');
var path = require('path');
var express = require('express')
var bodyParser = require("body-parser");
var http_status = require("http-status-codes");
var MongoClient = require('mongodb').MongoClient;
var app = express()
var MongoPassword = process.env.MONGO_PASSWORD;
var db;
var people;

MongoClient.connect('mongodb://cs336:' + MongoPassword + '@ds155653.mlab.com:55653/cs336', function (err, client){
  if (err) {throw err;}

  db = client.db('cs336')

  db.collection('dave').find().toArray(function (err, result){
    if (err) throw err

    people = result;
  })
  app.listen(app.get('port'), function() {
      console.log('Server started: http://localhost:' + app.get('port') + '/');
  })
});

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


function Person(firstname, lastname, loginID, startDate) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.loginID = loginID;
    this.startDate = startDate;
}

Person.prototype.seniority = function getyears(){
  var today = new Date();
  var startingDate = new Date(this.startDate);
  var years = today.getFullYear() - startingDate.getFullYear();
  var m = today.getMonth() -startingDate.getMonth();
  if (m <0 || (m ==0 && today.getDate() < startingDate.getDate())){
    years--;
  }
  return years;
}

Person.prototype.fullname = function getname(){
  name = this.firstname + " " + this.lastname;
  return name;
}

Person.prototype.compareID = function checkID(IDent){
  if(IDent == this.loginID){
    return 1;
  }else{
    return 0;
  }
}

function peoplecheck(id){
  for (var i = 0; i <people.length; i++){
    if (people[i].loginID == id){
      return people[i];
    }
  }
  return "404 Not Found";
}

function fullname(person){
  name = person.firstname + " " + person.lastname;
  return name;
}

function years(person){
  return Math.floor((Date.now() - new Date(person.startDate)) / 31536000000).toString();
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/people', function (req, res) {
  db.collection('dave').find().toArray(function(err, result){
    if (err) throw err;

      people = result;

  })
  res.json(people);
});


app.get('/person/:IDs', function(req, res){
  db.collection('dave').find().toArray(function(err, result){
    if (err) throw err;
      people = result;
  })

  var valid = peoplecheck(req.params.IDs);
  if (valid != "404 Not Found"){
    res.json(valid);
  } else {
    res.sendStatus(404);
  }
});

app.get('/person/:IDs/name', function(req, res){
  db.collection('dave').find().toArray(function(err, result){
    if (err) throw err;
      people = result;
  })

  var valid = peoplecheck(req.params.IDs);
  if (valid != "404 Not Found"){
    res.json(fullname(valid));
  } else {
    res.sendStatus(404);
  }
});

app.get('/person/:IDs/years', function(req, res){
  db.collection('dave').find().toArray(function(err, result){
    if (err) throw err;
      people = result;
  })

  var valid = peoplecheck(req.params.IDs);
  if (valid != "404 Not Found"){
    res.json(years(valid));
  } else {
    res.sendStatus(404);
  }
});

app.post('/people', function (req, res){
  db.collection('dave').find().toArray(function (err, result){
    if (err) throw err
      people = result;
  })

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var loginID = req.body.loginID;
  var startDate = req.body.startDate;

  var collection = db.collection('dave');

  collection.insertOne({"firstname": firstname, "lastname":lastname, "loginID": loginID, "startDate": startDate});

  db.collection('dave').find().toArray(function (err, result){
    if (err) throw err
      people = result;
      console.log(result);
      res.json(result);
  })
});


app.post('/addPersonResponse', function(req, res) {
  res.send('Added: <code> <br> </code> First name: ' + req.body.firstname + '<code><br></code> Last name: '
        + req.body.lastname + '<code><br></code> Login ID: ' + req.body.loginID + '<code><br></code> Start date: ' + req.body.startDate);

      var firstname= req.body.firstname;
      var lastname= req.body.lastname;
      var loginID= req.body.loginID;
      var startDate= req.body.startDate;
      var collection = db.collection('dave');

      collection.insertOne({"firstname": firstname, "lastname":lastname, "loginID": loginID, "startDate": startDate});

      db.collection('dave').find().toArray(function (err, result){
        if (err) throw err
          people = result;
          console.log(result);
          res.json(result);
      })
});

app.post('/getPersonResponse', function( req, res){
  db.collection('dave').find().toArray(function (err, result){
    if (err) throw err
      people = result;
      console.log(result);
      res.json(result);
  })

  var index = Person(parseInt(req.body.loginID));
  if (index != "404 Not Found")
  {
    res.json({"content": index});
  }
  else {
      res.sendStatus(404);
  }
});

app.post('/person/:IDs', function( req, res){
  db.collection('dave').find().toArray(function (err, result){
    if (err) throw err
      people = result;
      console.log(result);
      res.json(result);
  })
  var collection = db.collection('dave');
  collection.updateMany(
    {$set:
      {
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
      }},
    {"loginID":parseInt(req.params.loginID)},
    {
      $set:
      {
        "startDate":req.body.start
      }
    })
    res.send("Updated dated information for: " + req.params.loginID);
    collection.find().toArray(function (err, result){
      if (err) throw err
        people = result;
        console.log(result);
        res.json(result);
    })
});

app.delete('/person/:id', function(res, res) {
  db.collection('dave').find().toArray(function (err, result){
    if (err) throw err
      people = result;
      console.log(result);
      res.json(result);
  })
  var collection = db.collection('dave');
  collection.deleteMany({"loginID": parseInt(req.params.loginID)});
  collection.find().toArray(function (err, result){
    if (err) throw err
      people = result;
      console.log(result);
      res.json(result);
  })
  res.send("deleted ID: " + req.params.loginID);
});

app.get('*', function(req, res){
  res.sendStatus(404);
});
