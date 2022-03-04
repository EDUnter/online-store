const imageService = require('../services/imageService');

module.exports = {
    getById
}

function getById(req, res, next) {
    imageService.getById(req.params.name, res);
}