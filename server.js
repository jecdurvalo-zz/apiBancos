 var express    = require("express");
     bodyParser = require("body-parser");
     mongodb    = require("mongodb");
     objectID   = require("mongodb").ObjectID;

 var app = express();

 //Config Body Parser

 app.use(bodyParser.urlencoded({extend: true}));
 app.use(bodyParser.json());

 var port = 3000;
 app.listen(port);

 console.log("Servidor online! Ele está funcionando na porta " + port);

 app.get('/', function (re, res) {
     res.send({
         msg: 'Olá'
     })
 });

 var db = new mongodb.Db('baseAgencias', new mongodb.Server(
        'localhost',
         27017,
         {}
        ),
    {}
);

 // GET

 app.get('/api', function (req, res) {
     var dados = req.body;

     db.open(function (err, mongoclient) {
         mongoclient.collection('agencias', function (err, collection) {
             collection.find().toArray(function (err, results) {
                 if (err) {
                     res.json(err);
                 } else {
                     res.json(results)
                 }
                 mongoclient.close();
             });
         });
     });
 });

 // GET by ID

 app.get('/api/:id', function (req, res) {
     var dados = req.body;

     db.open(function (err, mongoclient) {
         mongoclient.collection('agencias', function (err, collection) {
             collection.find(objectID(req.params.id)).toArray(function (err, results) {
                 if (err) {
                     res.json(err);
                 } else {
                     res.json(results)
                 }
                 mongoclient.close();
             });
         });
     });
 });

 // PUT by ID

 app.put('/api/:id', function (req, res) {
     var dados = req.body;

     db.open(function (err, mongoclient) {
         mongoclient.collection('agencias', function (err, collection) {
             collection.update(
                 {
                     _id: objectID(req.params.id)
                 }, {
                     $set: {
                         nome: req.body.nome
                     }
                 },
            {},

                 function (err, results) {
                     if (err) {
                         res.json(err);
                     } else {
                         res.json(results)
                     }
                     mongoclient.close();
                 });
         });
     });
 });