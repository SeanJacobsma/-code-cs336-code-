const express = require('express')
const app = express()
const port = 3000

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
  name = this.firstname + this.lastname;
  return name;
}

Person.prototype.compareID = function checkID(IDent){
  if(IDent == this.loginID){
    return 1;
  }else{
    return 0;
  }
}

var person1 = new Person("Sean", "Jacobsma", "skj4", "2015/09/02");
var person2 = new Person("Cameron", "Entwistle", "cpe3", "2014/09/03");
var person3 = new Person("Eric", "Standinger", "ers32", "2016/08/31");
var people = [person1, person2, person3];

if(person2.compareID("cpe3") == 1){
  console.log(person2.fullname());
  console.log(person2.seniority());
}

app.get('/', (req, res) => res.send('Welcome to Calvin College! \n links: \n /people \n /person/(id) \n /person/(id)/name \n /person/(id)/years'))
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

app.get(/\/person\/.*$/, function(req,res){

})
app.get('*', function(req, res){
  res.sendStatus(404);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
