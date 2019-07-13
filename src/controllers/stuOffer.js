"use strict";

const StuOfferModel = require('../models/stuOffer');


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    StuOfferModel.create(req.body)
        .then(request => res.status(201).json(request))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = (req, res) => {
    StuOfferModel.findById(req.params.id).exec()
        .then(stuOffer => {

            if (!stuOffer) return res.status(404).json({
                error: 'Not Found',
                message: `stuOffer not found`
            });

            res.status(200).json(stuOffer)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    StuOfferModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(stuOffer => res.status(200).json(stuOffer))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    StuOfferModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Your Student Offer with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    StuOfferModel.find({}).exec()
        .then(stuOffers => res.status(200).json(stuOffers))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    create,
    read,
    update,
    remove,
    list
};
