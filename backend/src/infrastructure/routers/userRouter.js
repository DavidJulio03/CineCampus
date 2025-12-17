const express = require('express');
const userController = require('../controllers/userController');
const { validarCrearCliente } = require('../validators/userValidator');
const handleValidation = require('../middlewares/handleValidation');

const userRouter = express.Router();


userRouter.post('/signin', 
    validarCrearCliente, 
    handleValidation,
    (req, res) => userController.crearUser(req, res))


module.exports = userRouter

