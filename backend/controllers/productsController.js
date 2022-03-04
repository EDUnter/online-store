const Joi = require('joi');
const validateRequest = require('../_midleware/validateRequest');
const productsService = require('../services/productsService');

module.exports = {
    getAll,
    getById,
    create,
    update,
    _delete
}

function getAll(req, res, next) {
    productsService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function getById(req, res, next) {
    productsService.getById(req.params.id)
        .then(products => products ? res.json(products) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    //createSchema();
    productsService.create(req.body)
        .then(products => res.json(products))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    //updateSchema();
    productsService.update(req.params.id, req.body)
        .then(products => res.json(products))
        .catch(next);
}

function _delete(req, res, next) {
    productsService.delete(req.params.id)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(next);
}