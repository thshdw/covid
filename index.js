'use strict';
const compression = require('compression');
const express = require("express");
const app = express();
const parser = require('./parse');
const esriData = require('./esri');

app.use(compression());

app.get("/map", (req, res) => {
    res.sendFile('./map2.html', { root: __dirname });
});
app.get("/favicon.ico", (req, res) => {
    res.sendFile('./favicon.png', { root: __dirname });
});

// The data
app.get("/data", (req, res) => {
    parser.run(function(data){
        res.header("Content-Type",'application/json');
        res.json(data);
    });
});
// The esri
app.get("/esri.geojson", (req, res) => {
    parser.run(function(data){
        //res.type('application/json');
        console.log('getting esri data');
        let d = new esriData(data);
        //console.log(d);
        res.header("Content-Type",'application/geo+json');
        //res.send(JSON.stringify(d, null, 4));
        res.json(d);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
