const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/hello', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = "just kidding, it's only " + req.query.text + "... lame.";
  var send = JSON.parse(`{"text": "${data}"}`)
  res.json( send );
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
