"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const movie = require('./routes/movie');
const request = require('./routes/request');
const stuOffer = require('./routes/stuOffer');

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
api.use('/movies', movie);
api.use('/requests', request);
api.use('/stuOffers', stuOffer);



module.exports = api;