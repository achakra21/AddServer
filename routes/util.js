var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');




/* validate password rule

 * min 6 characters, max 50 characters
 * must contain 1 letter
 * must contain 1 number
 * may contain special characters like !@#$%^&*()_+

 */

router.post('/validatepwdrule', function (req, res) {

  var password = req.body.password
  console.log(password);
  if (password.length < 6) {
    res.send('password is too short!!');
    res.end('password is too short!!');

  } else if (password.length > 50) {
    res.send('password is too long!!');
    res.end('password is too long!!');

  } else if (password.search(/\d/) == -1) {
    res.send('password does not contain a number!!');
    res.end('password does not contain a number!!');


  } else if (password.search(/[a-zA-Z]/) == -1) {

    res.send('password does not contain a letter!!');
    res.end('password does not contain a letter!!');

  } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
    res.send('bad character!!');
    res.end('bad character!!');
  }

  else {
    res.send('valid password');
    res.end('valid password');

  }
});

/* validate email */
router.post('/checkemailvalidation', function (req, res) {

  var email = req.body.email;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (re.test(email)) {
    res.send('valid email');
    res.end('valid email');

  } else {
    res.send('invalid email');
    res.end('invalid email');

  }
});

module.exports = router;
