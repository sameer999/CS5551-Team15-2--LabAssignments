var path = require('path');
var express = require('express');
var app = express();
var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

function onLoadFn(){
  gapi.client.setApiKey('AIzaSyCKP40Is7s-Hu7_ajoifKTnXYuFND86_d8');
  gapi.client.load('plus', 'v1', function(){});
}
app.listen(63342, function() {
  console.log('Listening at http://localhost:63342')
});





