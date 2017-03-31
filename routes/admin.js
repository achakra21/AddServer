var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var sizeof = require('object-sizeof');
var Schema = mongoose.Schema;
var fs = require('fs');


var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/AddServer';




router.post('/uploadbimage', function (req, res) {

    response = {
        email: req.query.email
    };

  

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {

            console.log('Connection established to', url);
            var isCollectionExists = false;

            var find = new Promise(function (resolve, reject) {

                db.listCollections({ name: "admin" })
                    .next(function (err, collinfo) {
                        if (collinfo) {
                            isCollectionExists = true;
                            console.log("Collection exists");
                            resolve(isCollectionExists);

                        }

                        else {
                            console.log("Collection does not exists");
                        }
                    });

            });

            find.then(function (disCollectionExistsb) {

                if (isCollectionExists === false) {
                    console.log("inside if block");
                    db.createCollection("admin", function (err, collection) {
                        if (err) throw err;

                        console.log("Created admin collection");
                        console.log(collection);
                    });
                }
            });

            var collection = db.collection('admin');

            //always use forward slashes while giving the file path in windows
            var imgPath = '/AddServer/AddServer/routes/img.PNG';

            console.log("Imagepath   "+req.body.imgPath+"   "+req.body.shopName+"   "+req.body.shopAddress+"   "+req.body.price);

            //read binary data
            var imgBitmap = fs.readFileSync(imgPath);
            //get the base 64 out of the binary
            var base64 = new Buffer(imgBitmap).toString('base64');

            var shopName = req.body.shopName;
            var shopAddress = req.body.shopAddress; 
            var description = req.body.description;
            var price = req.body.price;
            

            // these are the data need to be inserted inside the admin collection
            // var shopName = "MyShop";
            // var shopAddress = "Market building,Bapuji Nagar,Bhubaneswar,Pin - 751001,Odisha,India "
            // var description = "This is a very good product i am selling it for discount";
            // var price = "2344";

            //here is my data model
            var addData = { shopName: '' + shopName, shopAddress: '' + shopAddress, description: '' + description, price: '' + price, base64: '' + base64 };

            //store it in admin collection 
            
            collection.insert([addData], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documeents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });



            //console.log(base64);

        }
    });

    res.end("OK");
});

module.exports = router;
