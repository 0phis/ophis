var express = require('express');
var google = require('googleapis');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});
router.get('/gallery', function(req, res, next) {
  res.render('gallery', { title: 'gallery' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about' });
});
router.get('/google-apis', function(req, res, next) {
  // res.render('anaapis', { title: 'apis' });
  fs.readFile('./myappapis-9299a542bcef.json', 'utf8', function (err,data) {
    if (err) {
      return console.log('err',err);
    }
    var key = JSON.parse(data);
    console.log('>>>>>>>>>>>>>>>>>>',data);
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      ['https://www.googleapis.com/auth/analytics'], // an array of auth scopes
      null
    );
    
   jwtClient.authorize(function (err, tokens) {
    console.log('??????????????????',tokens);
        console.log(err,tokens);
      if (err) {
        console.log(err);
        return;
      }
    });
  });
});
module.exports = router;
