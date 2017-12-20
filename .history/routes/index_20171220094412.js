var express = require('express');
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
  
  res.render('about', { title: 'about' });
});
module.exports = router;
var google = require('googleapis');
var plus = google.plus('v1');

var API_KEY = 'ABC123'; // specify your API key here

plus.people.get({
  auth: API_KEY,
  userId: '+google'
}, function (err, user) {
  console.log('Result: ' + (err ? err.message : user.displayName));
});