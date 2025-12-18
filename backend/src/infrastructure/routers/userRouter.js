const express = require('express');
const userController = require('../controllers/userController');
const { validarLogIn, validarSignUp } = require('../validators/userValidator');
const handleValidation = require('../middlewares/handleValidation');
const auth = require("../middlewares/authMiddleware")

const userRouter = express.Router();

//  AUTH
userRouter.post('/auth/signup', 
    validarSignUp, 
    handleValidation,
    (req, res) => userController.SignUp(req, res));


userRouter.post('/auth/login', 
    validarLogIn, 
    handleValidation,
    (req, res) => userController.LogIn(req, res));


userRouter.get('/auth/me', 
    auth,
    (req, res) => userController.authMe(req, res)
)

module.exports = userRouter

