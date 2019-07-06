"use strict";

const mongoose = require('mongoose');

// Define the movie schema

const SeniorRequestSchema  = new mongoose.Schema({
    id: String,
    title: String,
    category: String,
    specification: String
});

// Export the SeniorRequest model
module.exports = mongoose.model('SeniorRequest', SeniorRequestSchema);