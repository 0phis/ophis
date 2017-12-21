var express = require('express');
var google = require('googleapis');
var request = require('request');
var analytics = google.analytics('v3');
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
  var key =JSON.parse( fs.readFileSync('myappapis-9299a542bcef.json'));
 var VIEW_ID = 'ga:166533939';
    let jwtClient = new google.auth.JWT(
      key.client_email, null, key.private_key,
      ['https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets'], null);
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        return;
      }
      let analytics = google.analytics('v3');
      console.log(analytics.management.accounts.list());
      queryData(analytics);
    });
    function queryData(analytics) {
      analytics.data.ga.get({
        auth: jwtClient,
        'ids': VIEW_ID,
        'metrics': 'ga:uniquePageviews',
        'dimensions': 'ga:pagePath',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        'sort': '-ga:uniquePageviews',
        'max-results': 10,
        'filters': 'ga:pagePath=~/ch_[-a-z0-9]+[.]html$',
      }, function (err, response) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(JSON.stringify(response, null, 4));
      });  
    }
// res.render('anaapis', { title: 'apis' }); 
});
router.get('/google', function(req, res, next) {
  res.render('anaapis', { title: 'apis' }); 
});
module.exports = router;
