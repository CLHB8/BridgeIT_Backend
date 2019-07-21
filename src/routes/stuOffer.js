"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const StuOfferController = require('../controllers/stuOffer');


router.get('/', middlewares.checkAuthentication,StuOfferController.list); // List all student offers
router.post('/', middlewares.checkAuthentication, middlewares.checkAuthentication, StuOfferController.create); // Create a new student offer
router.get('/:id', middlewares.checkAuthentication,StuOfferController.read); // Read a student offer by Id
router.get('/my/:id',middlewares.checkAuthentication, StuOfferController.readMy); // Read all offers by one student
router.get('/req/:id', middlewares.checkAuthentication, StuOfferController.readReqOffers); // Read all offers to one request
router.put('/:id', middlewares.checkAuthentication, StuOfferController.update); // Update a student offer by Id
router.delete('/:id', middlewares.checkAuthentication, StuOfferController.remove); // Delete a student offer by Id


module.exports = router;