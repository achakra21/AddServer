var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/AddServer';
const cors = require('cors');
router.use(cors());





/* post user data. */
router.post('/users', function (req, res, body) {

  res.render('index', { title: 'User' });
  //get the value from post method  use req.body.nameofitem

  console.log('firstname' + req.body.firstname);
  var id = req.body.id;
  var age = req.body.age;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var address = req.body.address;
  var phone = req.body.phone;
  var sex = req.body.sex;
  var streetaddress = req.body.streetaddress;
  var city = req.body.city;
  var state = req.body.state;
  var zipcode = req.body.zipcode;
  var userrole = req.body.userrole;
  var password = req.body.password;
  var email = req.body.email;



  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //connection establish
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('users');

      //Create some users
      var user1 = {
        firstname: '' + firstname, lastname: '' + lastname, age: '' + age, address: '' + address, phone: '' + phone, sex: '' + sex, streetaddress: '' + streetaddress
        , city: '' + city, state: '' + state, zipcode: '' + zipcode, userrole: '' + userrole, password: '' + password, email: '' + email
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
});




router.get('/validateuser', function (req, res) {

  response = {
    email: req.query.email
  };

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {

      console.log('Connection established to', url);


      var collection = db.collection('users');
      var find = new Promise(function (resolve, reject) {
        collection.findOne({ email: response.email }, function (err, document) {
          if (document === "undefined" || document === null) {

            reject(err);
            res.end('Email does not exits!!!!');
          }

          else {
            resolve(db);
            res.end('Sucess!!');
            console.log(document._id);
          }

        });

      });

      find.then(function (db) {

        db.close();
      });

    }


  });

});

router.get('/findId', function (req, res) {

  response = {
    email: req.query.email
  };

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {

      console.log('Connection established to', url);


      var collection = db.collection('users');
      var find = new Promise(function (resolve, reject) {
        collection.findOne({ email: response.email }, function (err, document) {


          console.log('inside');


          if (document === "undefined" || document === null) {

            reject(err);
            console.log('Email does not exits!!!!');
            res.status(400);
            res.send('User does not exits!!');
            res.end('Email does not exits!!!!');
          }

          else {
            resolve(db);
            if (document.password === req.query.password) {
              res.status(201);
              res.send('sucess');
              res.end('ok');
            }

            else{

            console.log('password does not exits!!!!');
            res.status(402);
            res.send('password does not exits!!');
            res.end('password does not exits!!!!');

            }

          }

        });

      });

      find.then(function (db) {

        db.close();
      });

    }
 });

});


//update user profile
router.put('/updateuserprofile', function (req, res) {

  response = {
    email: req.query.email
  };


  var age = req.body.age;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var address = req.body.address;
  var phone = req.body.phone;
  var sex = req.body.sex;
  var streetaddress = req.body.streetaddress;
  var city = req.body.city;
  var state = req.body.state;
  var zipcode = req.body.zipcode;
  var userrole = req.body.userrole;
  var password = req.body.password;
  var email = req.body.email;

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //connection establish
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('users');

      //Create some users
      var user1 = {
        firstname: '' + firstname, lastname: '' + lastname, age: '' + age, address: '' + address, phone: '' + phone, sex: '' + sex, streetaddress: '' + streetaddress
        , city: '' + city, state: '' + state, zipcode: '' + zipcode, userrole: '' + userrole, password: '' + password, email: '' + email
      };


      // Insert some users
      collection.update({ email: "Jessica" }, {
        $set: {
          firstname: '' + firstname, lastname: '' + lastname, age: '' + age, address: '' + address, phone: '' + phone, sex: '' + sex, streetaddress: '' + streetaddress
          , city: '' + city, state: '' + state, zipcode: '' + zipcode
        }
      }, function (err, result) {
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

  //console.log("Name"+firstname);


  res.end('Ok')



});






module.exports = router;
