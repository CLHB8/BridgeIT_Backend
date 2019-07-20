"use strict";

const RatingsModel = require('../models/ratings');


const read = (req, res) => {
    RatingsModel.findById(req.params.id).exec()
        .then(stuOffer => {

            if (!stuOffer) return res.status(404).json({
                error: 'Not Found',
                message: `stuOffer not found`
            });


            res.status(200).json(stuOffer)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error read',
            message: error.message
        }));
};

const readStuRatings = (req, res) => {
    RatingsModel.find({studentId: req.params.id}).exec()
        .then(request => {
            if (!request) return res.status(404).json({
                error: 'Not Found',
                message: `Student not found in Ratings`
            });
            res.status(200).json(request)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


const readSenRatings = (req, res) => {
    RatingsModel.find({seniorId: req.params.id}).exec()
        .then(request => {
            if (!request) return res.status(404).json({
                error: 'Not Found',
                message: `Senior not found in Ratings`
            });
            res.status(200).json(request)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const createRating = (req,res) => {
    const rating = Object.assign(req.body);


    RatingsModel.create(rating)
        .then(rating => {

            // rating._id
            // rating.student
            res.status(200).json({ratingID: rating._id});
        })
        .catch(error => {
            if(error.code === 11000) {
                res.status(400).json({
                    error: 'Rating for this request (requestID) exists already. Use update',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    RatingsModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).exec()
        .then(stuOffer => res.status(200).json(stuOffer))
        .catch(error => res.status(500).json({
            error: 'Internal server error update',
            message: error.message
        }));
};
/*
const remove = (req, res) => {
    RatingsModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Your Student Offer with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error remove',
            message: error.message
        }));
};

const list = (req, res) => {
    RatingsModel.find({}).exec()
        .then(stuOffers => res.status(200).json(stuOffers))
        .catch(error => res.status(500).json({
            error: 'Internal server error list',
            message: error.message
        }));
};*/


module.exports = {
    createRating,
    read,
    readStuRatings,
    readSenRatings,
    update
};
