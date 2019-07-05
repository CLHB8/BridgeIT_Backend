"use strict";

const mongoose = require('mongoose');

// Define the movie schema

const SeniorRequestSchema  = new mongoose.Schema({
    category: String,
    specification: String,
    location: String
});

// Export the SeniorRequest model
module.exports = mongoose.model('SeniorRequest', SeniorRequestSchema);