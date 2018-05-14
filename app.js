const express = require('express');
const request = require('request');
const fs = require('fs');
const app = express();
const port = 8080;

//Webseite laden
const url = "https://coinmarketcap.com/currencies/bitcoin/#markets";
request(url, function(err,resp,body){
    if(err){
        console.log(err);
    } else {
      console.log(body);  
    }
});


//Setting up the Server
app.listen(port, function() {
    console.log(`app listening on port ${port}`);
});


