const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
  // res.send('hello world')
  // console.log(__dirname);
  res.sendFile(__dirname + '/index.html')
})



var db

MongoClient.connect('mongodb://admin:housepony150@ds157078.mlab.com:57078/star-war-quotes', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})



