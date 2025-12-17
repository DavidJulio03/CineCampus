const express = require('express');
const userController = require('../controllers/userController');
const { validarLogIn, validarSignUp } = require('../validators/userValidator');
const handleValidation = require('../middlewares/handleValidation');

const userRouter = express.Router();


userRouter.post('/auth/signup', 
    validarSignUp, 
    handleValidation,
    (req, res) => userController.SignUp(req, res));


userRouter.post('/auth/login', 
    validarLogIn, 
    handleValidation,
    (req, res) => userController.LogIn(req, res));


module.exports = userRouter

