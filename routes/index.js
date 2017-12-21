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
  
  var analytics = google.analytics('v3');
  var OAuth2Client = google.auth.OAuth2;
  
  // Client ID and client secret are available at
  // https://code.google.com/apis/console
  var CLIENT_ID = '358569257582-8s3ev0umpdh5ivuel0a5qt1bltjq1r0n.apps.googleusercontent.com';
  var CLIENT_SECRET = '7y2Mz5elAd2Wl8t5CvWa6tfv';
  var REDIRECT_URL = ["http://website-demo.ddns.net/oauth2callback"];
  var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  
  oauth2Client.credentials = 
  {
      access_token: 'ya29.GlwpBUKi3ExRlbVi_xhPYfhPk5a1sHl3PFz-1yDazDQZtdLjGoLasfWtu65S5_W6GgUsT1EKz-cYx_JmqS1mdGT8bidFsYB_X119B5GrXwzsFQ9k7AzEM7EW5l1A_A'
  };
  console.log(oauth2Client);
  // res.render('anaapis', { title: 'apis' }); 
});
router.get('/oauth2callback', function(req, res, next) {
  //  res.render('anaapis', { title: 'apis' }); 
       console.log(res);
       console.log(req);   
});
module.exports = router;
