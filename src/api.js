"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const request = require('./routes/request');
const stuOffer = require('./routes/stuOffer');
const ratings = require('./routes/ratings')

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'BridgeIT Backend'
    });
});

// API routes (edited by Neil: needed access from frontend)
api.use('/auth'  , auth);
api.use('/requests', request);
api.use('/stuOffers', stuOffer);
api.use('/ratings', ratings);



module.exports = api;