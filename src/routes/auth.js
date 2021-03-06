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
router.get('/user/:id', middlewares.checkAuthentication, AuthController.readUserById);
router.get('/premium/:id' , AuthController.isPremium);
router.get('/:id/number', middlewares.checkAuthentication, AuthController.getPhoneNumber);
router.get('/:id/mail', middlewares.checkAuthentication, AuthController.getMail);

router.put('/:id', middlewares.checkAuthentication, AuthController.updateById); // Update a User Information by Id


module.exports = router;