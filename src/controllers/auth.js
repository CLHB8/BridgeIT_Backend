"use strict";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config');
const UserModel = require('../models/user');

const login = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    UserModel.findOne({username: req.body.username}).exec()
        .then(user => {

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            if (!isPasswordValid) return res.status(401).json({
                error: 'TEST',
                message: "TEST"
            });

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({id: user._id, username: user.username}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.append('isSenior', user.isSenior);
            res.status(200).json({token: token, isSenior: user.isSenior, isPremium: user.isPremium})

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};


const register = (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});


    UserModel.create(user)
        .then(user => {

            // if user is registered without errors
            // create a token
            const token = jwt.sign({id: user._id, username: user.username}, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.append('isSenior', user.isSenior);
            res.status(200).json({token: token, isSenior: user.isSenior});


        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            } else {
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};


const me = (req, res) => {
    UserModel.findById(req.userId).select('username').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({token: null});
};

const readUser = (req, res) => {
    UserModel.findById(req.params.id).exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const readUserById = (req, res) => {
    UserModel.findById(req.params.id).exec()
        .then(user => {
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            const restrictedUserInformation = {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                mail: user.mail,
                streetname: user.streetname,
                streetnumber: user.streetnumber,
                cityname: user.cityname,
                postalcode: user.postalcode,
                isPremium: user.isPremium,
                phone_number: user.phone_number,
            };

            res.status(200).json(restrictedUserInformation)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const isPremium = (req, res) => {
    UserModel.findById(req.params.id).select('isPremium').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const getPhoneNumber = (req, res) => {
    UserModel.findById(req.params.id).select('phone_number').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const getMail = (req, res) => {
    UserModel.findById(req.params.id).select('mail').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const updateById = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    UserModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(updateUser => res.status(200).json(updateUser))
        .catch(error => res.status(500).json({
            error: 'Internal server error update',
            message: error.message
        }));
};


module.exports = {
    login,
    register,
    logout,
    me,
    readUser,
    updateById,
    isPremium,
    readUserById,
    getMail,
    getPhoneNumber
};