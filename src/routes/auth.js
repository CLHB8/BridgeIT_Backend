"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/logout', middlewares.checkAuthentication, AuthController.logout);

router.get('/:id', middlewares.checkAuthentication, AuthController.readUser);
router.get('/premium/:id' , AuthController.isPremium);

router.put('/:id', AuthController.updateById); // Update a User Information by Id


module.exports = router;