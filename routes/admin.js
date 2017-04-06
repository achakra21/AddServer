var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var sizeof = require('object-sizeof');
var Schema = mongoose.Schema;
var fs = require('fs');
const cors = require('cors');
router.use(cors());
var cloudinary = require('cloudinary');
var Promises = require('promise');


var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/AddServer';




router.post('/uploadbimage', function (req, res) {

    //always use forward slashes while giving the file path in windows

    var shopName = req.body.shopName;
    var shopAddress = req.body.shopAddress;
    var description = req.body.description;
    var price = req.body.price;
    var imgBase64 = req.body.imgURL;
    var imgURL = '';


  cloudinary.config({
        cloud_name: 'achakra21',
        api_key: '895512187215172',
        api_secret: 'i1wPd-dI0uX9BUh__Da_MMAD7kg'
    });

    var promise = new Promises(function (resolve, reject) {
        cloudinary.uploader.upload(imgBase64 + "", function (result) {
            console.log("result;;;;" + result);

            if (result) {
                console.log("Promise called if" + JSON.stringify(result));
                resolve(result)

            }

            else {
                console.log("Promise called else");
                reject(err);
            }

        });
    });

    promise.then(function (result) {
        console.log('then1 called');

        imgBase64 = result.secure_url + "";
        imgURL = imgBase64;
        console.log("imgBase64" + result.secure_url);

    }, function (reason) {

    }).then(function (imgBase64) {
        console.log('then2 called');
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

                                resolve(isCollectionExists);

                            }

                            else {

                            }
                        });

                });

                find.then(function (disCollectionExistsb) {

                    if (isCollectionExists === false) {

                        db.createCollection("admin", function (err, collection) {
                            if (err) throw err;


                        });
                    }
                });

                var collection = db.collection('admin');





                var addData = { shopName: '' + shopName, shopAddress: '' + shopAddress, description: '' + description, price: '' + price, imgURL: '' + imgURL };

                //store it in admin collection 

                collection.insert([addData], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Inserted %d documeents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    }
                    res.end("OK");
                    //Close connection
                    db.close();
                });



                //console.log(base64);

            }
        });
    }, function (reason) {
        // second error handler
    });







});

/* validate the signup field*/
router.post('/adminvalidatesignupfield', function (req, res) {

    var username = req.body.username;
    var email = req.body.email;
    var confemail = req.body.confemail;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
    var address = req.body.addData;
    var orgname = req.body.orgname;

    if (username === '') {
        res.send('username blank!!');
        res.end('username blank!!!!');
    }

    if (email === '') {
        res.send('email blank!!');
        res.end('email blank!!!!');

    }

    if (confemail === '') {
        res.send('confemail blank!!');
        res.end('confemail blank!!!!');

    }

    if (password === '') {
        res.send('password blank!!');
        res.end('password blank!!!!');
    }

    if (confpassword === '') {
        res.send('confpassword blank!!');
        res.end('confpassword blank!!!!');
    }

    if (address === '') {
        res.send('address blank!!');
        res.end('address blank!!!!');
    }

    if (orgname === '') {
        res.send('orgname blank!!');
        res.end('orgname blank!!!!');
    }

    if (password != confpassword) {
        res.send('password do not match!!');
        res.end('password do not match!!');
    }

    if (email != confemail) {
        res.send('email do not match!!');
        res.end('email do not match!!');
    }

    res.end("OK");
});

/* create admin users for login in admin portal*/

router.post('/createadminusers', function (req, res) {
    console.log("UserName::::::::::::::::::::::::::::::::::");

    var username = req.body.username;
    var email = req.body.email;
    var confemail = req.body.confemail;
    var password = req.body.password;
    var confpassword = req.body.confpassword;
    var address = req.body.address;
    var orgname = req.body.orgname;



    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connection establish
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('admin-users-profile');

            //user detail object
            var user1 = {
                username: '' + username, email: '' + email, password: '' + password, address: '' + address, orgname: '' + orgname
            };


            // Insert some users
            collection.insert([user1], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documeents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });

        }
    });
    console.log("UserName::::::::::::::::::::::::::::::::::");

    res.end("OK");
});





module.exports = router;
