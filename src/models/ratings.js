"use strict";

const mongoose = require('mongoose');

// Define the schema for the rating

const RatingSchema  = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    seniorId:{
        type:String,
        required: true
    },
    studentId:{
        type:String,
        required: true
    },
    RatingByStudent:{
        type: Number,
        default: -1
    },
    RatingBySenior:{
        type: Number,
        default: -1
    },
});

RatingSchema.set('versionKey', false);
RatingSchema.set('timestamps', true);

// Export the Rating Model
module.exports = mongoose.model('Rating', RatingSchema);