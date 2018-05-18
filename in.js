const express = require('express');
const request = require('request');
const app = express();
const port = 8080;

const apiURL = 'https://api.coinmarketcap.com/v2/listings/';

request(apiURL, function(err, resp, body){
    console.log('Getting cmc-API');
    const allCoins = JSON.parse(body).data;
    for (let i in allCoins) {
        let marketsUrl = `https://coinmarketcap.com/currencies/${allCoins[i].website_slug}/#markets`;
        console.log(marketsUrl);


    }    
});

//Setting up server
app.listen(port, function() {
    console.log(`app listening on port ${port}`);
});