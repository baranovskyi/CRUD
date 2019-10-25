const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
const databaseUrl = 'mongodb+srv://admin:admin@cluster0-30ljv.mongodb.net/test?retryWrites=true&w=majority';
const ObjectId = require('mongodb').ObjectID;
// var ProductAPI = require('./product.api');
let db;
MongoClient.connect(databaseUrl, {useUnifiedTopology: true}, (err, client) => {
    if (err) return console.log(err)
        db = client.db("Cluster0") 
        app.listen(3000, () => {
    console.log('database on port 3000')
  })
})

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/all-heroes', (req, res) => {
    db.collection('heroes').find().toArray((err, result) => {
        if (err) console.log(err);
        res.json(result);
    })
});
app.get('/heroId', (req, res) => {
    let idHero = req.query._id;
     db.collection('heroes').find({ "_id": ObjectId(idHero) }).toArray((err, result) => {
         res.json(result[0])
     });
});
app.post('/save', (req, res) => {
    console.log(req.body)
    db.collection('heroes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.send(req.body)
      })
})
app.put('/update', (req, res) => {
    db.collection('heroes')
    .findOneAndUpdate({ "_id": ObjectId(req.body._id)}, {
      $set: {
        'name': req.body.name
        }
      },
        (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
  })
app.delete('/heroes/:_id',(req, res) => { 
    db.collection('heroes').deleteOne({ "_id": ObjectId(req.params._id)})
    console.log({ '_id': req.params._id })
    res.send(req.body)
})

