const express = require('express');
const request = require('request');
const fs = require('fs');
const app = express();
const port = 8080;


//Setting up the Server
app.listen(port, function() {
    console.log(`app listening on port ${port}`);
});


