"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middlewares');
const RatingsController = require('../controllers/ratings')


router.post('/create', middlewares.checkAuthentication, RatingsController.createRating); // Create a new rating for a specific request

router.get('/req/:id', middlewares.checkAuthentication, RatingsController.readByReqId); // Read a rating by request Id
router.get('/:id', middlewares.checkAuthentication, RatingsController.readById); // Read a rating by rating Id
router.get('/stu/:id', middlewares.checkAuthentication, RatingsController.readStuRatings); // Read all ratings by one student
router.get('/sen/:id', middlewares.checkAuthentication, RatingsController.readSenRatings); // Read all ratings by one senior

router.put('/:id', middlewares.checkAuthentication, RatingsController.updateByReqId); // Update a rating by request_id
//router.delete('/:id', middlewares.checkAuthentication, StuOfferController.remove); // Delete a student offer by Id


/* duplicates with checkAuthentication
router.post('/create', middlewares.checkAuthentication, RatingsController.createRating); // Create a new rating for a specific request

router.get('/:id', middlewares.checkAuthentication, RatingsController.read); // Read a rating by request Id
router.get('/myStu/rating', middlewares.checkAuthentication, RatingsController.readStuRatings); // Read all ratings by one student
router.get('/mySen/rating', middlewares.checkAuthentication, RatingsController.readSentRatings); // Read all ratings by one senior

router.put('/:id', middlewares.checkAuthentication, RatingsController.update); // Update a rating by request_id
*/


module.exports = router;