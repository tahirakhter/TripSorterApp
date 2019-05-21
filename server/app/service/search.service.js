'use strict';

const axios = require('axios');
const fares = require('../JSON/fares');

module.exports.getSearchList = () => {
    return Promise.resolve(fares);
}