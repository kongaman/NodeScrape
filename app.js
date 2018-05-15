const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
const app = express();
const port = 8080;
const masterList = [];
//Webseite laden
const url = "https://coinmarketcap.com/currencies/cryptonite/#markets";
request(url, function(err, resp, body){
    let $ = cheerio.load(body);
    let liste = [];
    let check = [];
    let exchangeCount = $('tr').length - 1;
    let t = $('tr td:nth-child(2)');
    let i = $('tr td:nth-child(2)').children('img');
    let p = $('tr td:nth-child(3)');
    for (let index = 0; index < exchangeCount; index++) {
        if (!check.includes($(t).eq(index).text())) {
            check.push($(t).eq(index).text());
            liste.push(
                {   exchange : $(t).eq(index).text(), 
                    pair : $(p).eq(index).text(), 
                    imgUrl : $(i).eq(index).attr('src')
                });
        }    
    }
    masterList.push(liste);
    console.log(masterList);
});


//Setting up the Server
app.listen(port, function() {
    console.log(`app listening on port ${port}`);
});
