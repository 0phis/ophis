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
//   var OAuth2Client = google.auth.OAuth2;
  
//   // Client ID and client secret are available at
//   // https://code.google.com/apis/console
//   var CLIENT_ID = '358569257582-8s3ev0umpdh5ivuel0a5qt1bltjq1r0n.apps.googleusercontent.com';
//   var CLIENT_SECRET = '7y2Mz5elAd2Wl8t5CvWa6tfv';
//   var REDIRECT_URL = ["http://website-demo.ddns.net/oauth2callback"];
//   var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  
//   oauth2Client.credentials = 
//   {
//       access_token: 'ya29.GlwpBUKi3ExRlbVi_xhPYfhPk5a1sHl3PFz-1yDazDQZtdLjGoLasfWtu65S5_W6GgUsT1EKz-cYx_JmqS1mdGT8bidFsYB_X119B5GrXwzsFQ9k7AzEM7EW5l1A_A'
//   };
//   console.log(oauth2Client);

//   function queryAccounts() {
    
//    // Load the Google Analytics client library.
//    gapi.client.load('analytics', 'v3').then(function() {  
//      // Get a list of all Google Analytics accounts for this user
//      gapi.client.analytics.management.accounts.list().then(handleAccounts);
//    });
//  }
 

var drive = google.drive('v2');

var jwtClient = new google.auth.JWT(
  "servicemyapp@myappapis.iam.gserviceaccount.com",
  null,
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDdo5Bk8l/VglJ4\nuBeOsLSlfnx+8EmTGiZ31kfazezEjnDvt096xZMex0cYwvGDyJCCUtWbQYUEySy0\n41WP8w5ojiW5ovRwPi3RXMu4Fi7GigK/XEr3yCEsumxYIIVIo+WlOrr4kIVbLOqI\nqv8okoV6sMIGknpKmrRGVMz+ATbiZttmBeq95kCYDnhqz2XkbcdvqIlREe5DwL9G\nj0oJv8YczW0Z42kTlCyIsQ1mOWahzSBYRY6ANf04WEdDMsFhnBr8ykYF7EAhz6rY\nbnjKV+c1OGK411Je02vym0mma7PD2MNviBb7x6B0A9PW8LkvLBy/6gix0+pZh/gq\nq0RhYHtlAgMBAAECggEALzZ+9Un+KSSsPcP1XLN+n7xMd9vmyFurMx7lypHQLGSt\nYRsa5qu8tbM8jWVFfk2UnvZXQ03XMJhMGjJNES9088fH+H3idSCBsRYD3XB4QVm3\n0RyvaY3rpzQFDVbMHZewPRzAJF/g0HXGdht65CEmJucNRcohG9BNs6evzTHkB6D8\n3lOoDLEUtNsBYU/3YgpGsieLvksa1vBusp+ayWfu8+aJHXO87RV0u7oImw7+YHGJ\nqmtioR95QAAtJbBC5K1MZEfxtykcpPa4glshbogkBjU81Sum1/hnLLCH2wz3ET7X\nJadBF+VKLDz976QPImR8C4hmm8InIvu75LtlWrjEgQKBgQD7Kn7B6O+scfSmBhCW\nSqFP0DTgP9z9mtHbuVkgrZ50yFRR1JRyJxACGmnHh8MqUudhZH71Pl0XYuAqvmiP\nl/8InFOAxPGGvCsesUGWpjo4XRHZ7XtxV9ct/heJKtNLeZnmRaP7PvQ2B4+CAMVk\nM8Zrs8g3mkKZ7oG09Zzylhl8QQKBgQDh55Z7ksDhHL6whxEUDeruPWys/DaULu3Z\nrQWBOT02KCuFPjue6qOLYv74r1njFqYc6gTx8jcJEdsTb1rieFRMYHB/yiWODhos\nbhx3UDKmnRSunfb+yWdUf9RmMAxfC0kd1K3AahIxVrGnvsCfDEGfetO+Er12pi72\n+qVWBMgGJQKBgQDAgb6r81SYMLOZ+LYH62WeXe/ZHTnNazeEGJj2kfwMeGsgWTX6\nFHSRmBsRYr40l1xe6n7gi48gWJmGSXCs9ovz1pWt8cVJRroqCSRDSl7/Sl5fUUU3\nB2OXDdSOPrO6epZ5x1C7RnI5YywcMWkZtxFTBXXlICgCAauKvmIwENmxwQKBgCOf\n4NRF9VLKtKuj8SaHd1fwqdWxxG2j5PBh369cNnH27b4KbV6HRBk0GF9hT7yHEtUW\ndoctGk682R58fgmezjRpNPSCDWAUiz4cczLBm+s4dE2BLbVKT5g8vGMNCrZmUjZ5\nFpl0YMAVGtkINNogFa0vsnqT+/rdBCUAq9gf0uddAoGAQRhsuY5lXk/iXrORZ9Ru\nuj2pY2mmC3dBcmXJ9khm0B1XrR6r5r/ClwIxNZJsO732+Np7ii5f3Kr9jolEEeyB\nsNgXbbknLkFETArhreq68RSSKv5ODQzIIHG5YPtMYyeMPDYyicTB3ux8TOZF8x8E\nTB4CHeMtO+7FASWYXO4QwFE=\n-----END PRIVATE KEY-----\n",
  ['https://www.googleapis.com/auth/drive'], // an array of auth scopes
  null
);

jwtClient.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  }

  // Make an authorized request to list Drive files.
  drive.files.list({
    auth: jwtClient
  }, function (err, resp) {
    console.log(resp);
    // handle err and response
  });
});
 


  // res.render('anaapis', { title: 'apis' }); 
});
router.get('/oauth2callback', function(req, res, next) {
  //  res.render('anaapis', { title: 'apis' }); 
       console.log(res);
       console.log(req);   
});
module.exports = router;
