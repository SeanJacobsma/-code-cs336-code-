const express = require('express')
const app = express()
const port = 3000
const http_status = require("http-status-codes");
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



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


var people;
var COMMENTS_FILE = path.join(__dirname, 'people.json');
fs.readFile(COMMENTS_FILE, function(err, data) {
   if (err) {
     console.error(err);
     process.exit(1);
   }
   people= JSON.parse(data);
 });

app.get('/', (req, res) => res.send('Welcome to Calvin College! <br> links: <br> /people <br> /person/(id) <br> /person/(id)/name <br> /person/(id)/years'))
app.get('/people', (req, res) => res.send(people))


app.get('/person/:IDs', function(req, res){
  var valid = 0;
  for( var i = 0; i < people.length; i++){
    if (people[i].compareID(req.param('IDs')) == 1){
      res.send(people[i]);
      valid = 1;
    }
  }
    if(valid == 0) {
      res.sendStatus(404);
    }
})

app.get('/person/:IDs/name', function(req, res){
  var valid = 0;
  for( var i = 0; i < people.length; i++){
    if (people[i].compareID(req.param('IDs')) == 1){
      res.send(people[i].fullname());
      valid = 1;
    }
  }
    if(valid == 0) {
      res.sendStatus(404);
    }
})

app.get('/person/:IDs/years', function(req, res){
  var output = '';
  var valid = 0;
  for( var i = 0; i < people.length; i++){
    if (people[i].compareID(req.param('IDs')) == 1){
      output = '' + people[i].seniority() +' years';
      res.send(output);
      valid = 1;
    }
  }
    if(valid == 0) {
      res.sendStatus(404);
    }
})

app.post('/people', function (req, res){
  var addNewPerson = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    loginID: req.body.loginID,
    startDate: req.body.startDate,
  };
  people.push(addNewPerson);

var json = JSON.stringify(people);
    fs.writeFile(COMMENTS_FILE, json, function(err){});
});

app.post('/addPersonResponse', function(req, res) {
  res.send('Added: <code> <br> </code> First name: ' + req.body.firstname + '<code><br></code> Last name: '
        + req.body.lastname + '<code><br></code> Login ID: ' + req.body.loginID + '<code><br></code> Start date: ' + req.body.startDate);

  var addNewPerson ={
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      LoginID: req.body.loginID,
      startDate: req.body.startDate,
  };
  people.push(addNewPerson);

  var json = JSON.stringify(people);
      fs.writeFile(COMMENTS_FILE, json, function(err){});
});

app.post('/getPersonResponse', function( req, res){
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
  for(var i = 0; i < people.length; i++){
    if (people[i].loginID == req.params.loginID){
      people[i].firstname = req.body.firtname;
      people[i].lastname = req.body.lastname;
      people[i].startDate = req.body.startDate;
      res.send("Updated dated information for: " + req.params.loginID);
    }
  }
  res.sendStatus(404);
});

app.delete('/person/:id', function(res, res) {
  for(var i = 0; i < people.length; i++){
    if (people[i].loginID == req.params.loginID) {
      delete people[i];
      res.send("deleted ID: " + req.params.loginID);
    }
  }
  res.sendStatus(404);
});

app.get('*', function(req, res){
  res.sendStatus(404);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
