var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var sizeof = require('object-sizeof');
var Schema = mongoose.Schema;
var fs = require('fs');
const cors = require('cors');
router.use(cors());

var Promises = require('promise');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/AddServer';


router.get('/findallitems', function (req, res) {

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

            console.log('Connection established to', url);


            var collection = db.collection('admin');
            var find = new Promise(function (resolve, reject) {

                // Peform a simple find and return all the documents
                collection.find().toArray(function (err, docs) {

                    if (err) {
                        console.log('No data found or error in connection!!');
                        return;
                    }


                    if (docs === "undefined" || docs === null) {

                        reject();
                        console.log('data not found!!');
                        res.status(401);
                        res.send('data not found!!');
                        res.end('data not found!!');
                    }

                    else {

                        resolve();
                        res.status(201);
                        res.send(""+JSON.stringify(docs));
                        res.end(""+docs);

                    }

                    console.log("doc details:::" + JSON.stringify(docs));
                    console.log("doc details:::" + docs.length);


                });


            });

            find.then(function (db) {

                db.close();
            });

        }
    });

});

module.exports = router;






