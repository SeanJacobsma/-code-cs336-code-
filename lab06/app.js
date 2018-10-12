const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.get('/request', (req, res) => res.send('Welcome to Calvin College!'))
app.get('/request', function (req, res) {
  res.send('Hello World      ')
})

app.head('/request', function (req, res) {
  res.send('Got a HEAD request!    ')
})

app.post('/request', function (req, res) {
  res.send('Got a POST request!    ')
})

app.put('/request', function (req, res) {
  res.send('Got a PUT request at /request!    ')
})

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request at /request!    ')
})
app.get('*', function(req, res){
  res.sendStatus(418);
})

app.post('/forms/my-handling-form-page', function (req, res){
  res.send(' Your data has been submitted!<br>Username: ' + req.body.user_name
    +'<br>Email: ' + req.body.user_mail + '<br>Message: ' + req.body.user_message)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
