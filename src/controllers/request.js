"use strict";

const RequestModel = require('../models/request');


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    RequestModel.create(req.body)
        .then(request => res.status(201).json(request))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

    const read   = (req, res) => {
    RequestModel.findById(req.params.id).exec()
        .then(request => {
            if (!request) return res.status(404).json({
                error: 'Not Found',
                message: 'Request not found'
            });

            res.status(200).json(request)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};
const readMy   = (req, res) => {
    RequestModel.find({userId: req.params.id}).exec()
        .then(request => {
            if (!request) return res.status(404).json({
                error: 'Not Found',
                message: `Request not found  mal 3`
            });
            res.status(200).json(request)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};
const readHistory   = (req, res) => {
    RequestModel.find({userId: req.params.id}).exec()
        .then(request => {
            if (!request) return res.status(404).json({
                error: 'Not Found',
                message: `Request not found  mal 3`
            });
            res.status(200).json(request)

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

    RequestModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(request => res.status(200).json(request))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    RequestModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Request with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    RequestModel.find({}).exec()
        .then(requests => res.status(200).json(requests))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};



module.exports = {
    create,
    read,
    readMy,
    update,
    remove,
    list,
    readHistory
};