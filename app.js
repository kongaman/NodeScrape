const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
const app = express();
const port = 8080;

//Webseite laden
const url = "https://coinmarketcap.com/currencies/bitcoin/#markets";
request(url, function(err, resp, body){
    const $ = cheerio.load(body);
    const brzzzzz = $('head');
    console.log(brzzzzz);
    
});


//Setting up the Server
app.listen(port, function() {
    console.log(`app listening on port ${port}`);
});


