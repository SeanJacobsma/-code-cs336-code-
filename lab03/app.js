
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.redirect('/index.html'))
//app.get('/', (req, res) => res.send('Express.js is a framework for building web applications based on node.js.'))
//app.get('/', (req, res) => res.send('A static file does not need to be modified or processed.'))
//app.get('/', (req, res) => res.send('The server does not continue to deliver up Hello World, it is loaded once, and every time the server is reloaded'))




app.use(express.static('public'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

