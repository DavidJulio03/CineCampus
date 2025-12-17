const { validationResult } = require('express-validator');
const { ErrorResponse } = require('../../application/utils/respuestasHTTP')

module.exports = function (req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new ErrorResponse(400, 'Bad request', errors.array());
        return res.status(error.status).json(error)
    }

    next();
};