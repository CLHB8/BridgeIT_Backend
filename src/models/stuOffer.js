"use strict";

const mongoose = require('mongoose');

// Define the schema for the offer / answer of a student to a senior's request

const StuOfferSchema  = new mongoose.Schema({

    requestId: {
        type: String,
        required: true
    },
    requestCategory: {
        type: String,
        required: true
    },
    seniorId:{
        type:String,
        required: true
    },
    seniorUsername:{
        type:String,
        required: true
    },
    studentUsername:{
        type:String,
        required: true
    },
    studentId:{
        type:String,
        required: true
    },
    introMsg:{
        type: String,
        required: true
    }
});

StuOfferSchema.set('versionKey', false);
StuOfferSchema.set('timestamps', true);

// Export the Movie model
module.exports = mongoose.model('StuOffer', StuOfferSchema);