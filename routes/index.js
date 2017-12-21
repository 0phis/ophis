var express = require('express');
var google = require('googleapis');
var request = require('request');
var GA = google.analytics('v3');
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
//   var analytics = google.analytics('v3');
//   var key =JSON.parse( fs.readFileSync('myappapis-9299a542bcef.json'));
// var VIEW_ID = 'ga:166533939';
// var jwtClient = new google.auth.JWT(
//   'servicemyapp@myappapis.iam.gserviceaccount.com', null, key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], null);
// jwtClient.authorize(function (err, tokens) {
//               if (err) {
//                     console.log(err);
//               } else {
//                   analytics.data.ga.get({
//                       'auth': jwtClient,
//                       'ids': VIEW_ID,
//                       'metrics': 'ga:sessions', 
//                       'start-date': '7daysAgo', 
//                       'end-date': 'today', 
//                       'dimensions': 'ga:date', 
//                       }, function (err, response) {
//                       if (err) {
//                           console.log(err);
//                       } else {  
//                           console.log(JSON.stringify(response, null, 4));
//                       }
//                   });
//               }
//           });
// res.render('anaapis', { title: 'apis' }); 
});
router.get('/google', function(req, res, next) {
  res.render('anaapis', { title: 'apis' }); 
});
module.exports = router;
