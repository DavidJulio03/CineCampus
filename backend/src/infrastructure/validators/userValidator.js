const { check } = require('express-validator');

module.exports = {

    validarSignUp: [
        check('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isString().withMessage('El nombre debe ser texto')
            .trim(),

        check('email')
            .notEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('El email no es válido')
            .trim()
            .toLowerCase(),

        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),

    ],

    validarLogIn: [
        check('email')
            .notEmpty().withMessage('El email es obligatorio')
            .isEmail().withMessage('El email no es válido')
            .trim()
            .toLowerCase(),

        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres'),

    ]
}