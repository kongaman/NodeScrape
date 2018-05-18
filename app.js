const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();
const port = 8080;
const cmcApiURL = 'https://api.coinmarketcap.com/v2/listings/';
const masterList = [];

request(cmcApiURL, function(err, resp, body){
    console.log('Getting cmc-API');

    const allCoins =  JSON.parse(body).data; 
    let writeCount = 500;
    for (let i in allCoins) {

        let coinCount = i;
        let coinName = allCoins[i].name;       
        let marketURL = `https://coinmarketcap.com/currencies/${allCoins[i].website_slug}/#markets`;

        request(marketURL, function(err, resp, body){
            console.log(`Coin ${coinCount}: ${coinName} - URL: ${marketURL}`);

            let $ = cheerio.load(body);
            const liste = { coinName: coinName, exchanges: [] };
            const check = new Set();
            
            const t = $('tr td:nth-child(2)'),
                  i = $('tr td:nth-child(2)').children('img'),
                  //p = $('tr td:nth-child(3)'),
                  l = $('tr td:nth-child(3)').children('a');
            let exchangeCount = t.length;
            console.log(`${exchangeCount} Exchangerow(s) found for Coin: ${coinName} `);

            for (let index = 0; index < t.length; index++) {
                
                const   exchangeName = $(t).eq(index).text(),
                        imgUrl = $(i).eq(index).attr('src'),
                        //pair = $(p).eq(index).text(),
                        link = $(l).eq(index).attr('href');
    
                if (!check.has(exchangeName)) {
                    check.add(exchangeName);
                    liste.exchanges.push(
                        {   exchangeName,
                            link,
                            //pair, 
                            imgUrl
                        });
                    console.log(`${exchangeName} added to ${coinName}`);
                } else {
                    console.log('Exchange already in list');
                } 
            }

            masterList.push(liste);
            console.log(`${coinName}-Exchanges pushed to masterlist \n`);         
        });
    }
});


function writeToFile(filename, list) {
    fs.writeFile(filename, JSON.stringify(list, null, 4), function(err){
    console.log('File successfully written to project-directory');  
    });
}

//Setting up the Server
app.listen(port, function() {
    console.log(`app listening on port ${port}`);
});
