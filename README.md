# ophis
*cài đặt:</br>
$ npm install googleapis --save</br>
$ npm install google-auth-library --save

*thư viện:</br>
var google = require('googleapis');</br>
var analytics = google.analytics('v3');</br>
var fs = require('fs');

*Create My_Project.json:</br>
//Click Create Credentials and select OAuth client ID.</br>
//Select Web application for APPLICATION TYPE.</br>
//Name the credential.</br>
//Set the AUTHORIZED JAVASCRIPT ORIGINS to http://localhost:8080</br>
//Set the AUTHORIZED REDIRECT URIS to http://localhost:8080/oauth2callback</br>
//Click Create.</br>
*Click Create Credentials and select  'Service account key'</br>
*client_email : decentralization analytics</br>
B1: Analytics Accounts, Properties & Apps, Views  ???</br>
B2:Click Admin</br>
B3: Click User Management</br>
B4: Add client_email in My_Project.json</br>

* Code:</br>
var key =JSON.parse( fs.readFileSync('My_Project.json'));</br>
 var VIEW_ID = 'ga:??????'; //anatytics admin Views View Settings</br>
    let jwtClient = new google.auth.JWT(</br>
      key.client_email, null, key.private_key,</br>
      ['https://www.googleapis.com/auth/analytics.readonly'], null);</br>
    jwtClient.authorize(function (err, tokens) {</br>
      if (err) {</br>
        console.log(err);</br>
        return;</br>
      }</br>
      queryData(analytics);</br>
    });</br>
    function queryData(analytics) {</br>
      analytics.data.ga.get({</br>
        'auth':jwtClient,</br>
        'ids': VIEW_ID,</br>
        'metrics': 'ga:sessions,ga:totalEvents,ga:uniqueEvents,ga:uniquePageviews',</br>
        'start-date': '30daysAgo',</br>
        'end-date': 'yesterday',</br>
        'max-results': 10,</br>
      }, function (err, response) {</br>
        if (err) {</br>
          console.log(err);</br>
          return;</br>
        }</br>
        // console.log('...................');</br>
      //  console.log(JSON.stringify(response, null, 4));</br>
      console.log(JSON.stringify(response, null, 4));</br>
      });  </br>
    }</br>
		
* book:</br>
https://developers.google.com/analytics/devguides/reporting/core/dimsmets#cats=session,event_tracking</br>
https://developers.google.com/analytics/devguides/reporting/core/v3/reference#q_details</br>
https://developers.google.com/apis-explorer/#p/analytics/v3/</br>
