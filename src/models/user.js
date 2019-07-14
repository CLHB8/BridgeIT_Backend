"use strict";

const mongoose = require('mongoose');

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true

    },
    phone_number: {
        type: String,
        required: false
    },
    streetname: {
        type: String,
        required: true
    },
    streetnumber: {
        type: String,
        required: true
    },
    cityname: {
        type: String,
        required: true
    },
    isSenior: {
        type: Boolean,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    }
});

UserSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);