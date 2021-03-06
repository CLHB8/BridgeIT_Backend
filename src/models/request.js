"use strict";

const mongoose = require('mongoose');

// Define the request schema

const RequestSchema  = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    specification: {
        type: String,
        required: true
    },
    userId:{
        type:String,
    },
    senUserName:{
        type: String,
    },
    isAssigned: {
        type: Boolean,
    },
    assignedStudent: {
        type: String,
    },
    assignedStudentMail: {
        type: String
    }
});

RequestSchema.set('versionKey', false);
RequestSchema.set('timestamps', true);

// Export the Movie model
module.exports = mongoose.model('Request', RequestSchema);