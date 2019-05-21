const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//for allowing cross origin requests
app.use(cors());

//allow OPTIONS on all resources
app.options('*', cors());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));



/*********************************************** load Controller ******************************************************/
const searchController = require('./controller/search.controller');


/*********************************************** tweets routes ******************************************************/
app.route('/api/results')
    .get(searchController.getSearchList);

module.exports = app;
