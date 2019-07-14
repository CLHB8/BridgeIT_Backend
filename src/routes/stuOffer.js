"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const StuOfferController = require('../controllers/stuOffer');


router.get('/', StuOfferController.list); // List all student offers
router.post('/', middlewares.checkAuthentication, StuOfferController.create); // Create a new student offer
router.get('/:id', StuOfferController.read); // Read a student offer by Id
router.get('/my/:id', StuOfferController.readMy); // Read all offers by one student
router.put('/:id', middlewares.checkAuthentication, StuOfferController.update); // Update a student offer by Id
router.delete('/:id', middlewares.checkAuthentication, StuOfferController.remove); // Delete a student offer by Id


module.exports = router;