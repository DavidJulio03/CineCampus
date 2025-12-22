const { check, param } = require('express-validator');

module.exports = {
    
    validarMovie: [
        // Validación de campos básicos
        check('nombre')
            .notEmpty().withMessage('El nombre de la película es obligatorio')
            .isString().withMessage('El nombre debe ser una cadena de texto')
            .trim(),

        check('descripcion')
            .notEmpty().withMessage('La descripción es obligatoria')
            .isString().withMessage('La descripción debe ser texto'),

        // Validación de Arrays (Autores, Actores, Géneros)
        check('autores')
            .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un autor en un arreglo'),
        
        check('actores')
            .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un actor en un arreglo'),

        check('generos')
            .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un género en un arreglo'),

        // Validación de objeto anidado: Cartelera
        check('cartelera.fecha_inicio')
            .notEmpty().withMessage('La fecha de inicio es obligatoria')
            .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida (ISO8601)'),

        check('cartelera.fecha_fin')
            .notEmpty().withMessage('La fecha de fin es obligatoria')
            .isISO8601().withMessage('La fecha de fin debe ser una fecha válida (ISO8601)')
            .custom((value, { req }) => {
                // Validación extra: La fecha de fin no puede ser antes que la de inicio
                if (new Date(value) < new Date(req.body.cartelera.fecha_inicio)) {
                    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
                }
                return true;
            }),

        // Validación de objeto anidado: Data (URLs/Strings)
        check('data.trailer')
            .notEmpty().withMessage('El link del trailer es obligatorio')
            .isURL().withMessage('El trailer debe ser una URL válida'),

        check('data.banner')
            .notEmpty().withMessage('El link del banner es obligatorio')
            .isURL().withMessage('El banner debe ser una URL válida')
    ],

    validarUpdateMovie: [
        // Usamos .optional() para permitir actualizaciones parciales

        param('id')
            .notEmpty().withMessage('El ID es necesario para actualizar')
            .isMongoId().withMessage('El ID proporcionado no es un formato válido (MongoID)'),

        check('nombre')
            .optional()
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .isString().withMessage('El nombre debe ser una cadena de texto')
            .trim(),

        check('descripcion')
            .optional()
            .notEmpty().withMessage('La descripción no puede estar vacía')
            .isString().withMessage('La descripción debe ser texto'),

        check('autores')
            .optional()
            .isArray({ min: 1 }).withMessage('Si envía autores, debe ser un arreglo con al menos uno'),
        
        check('actores')
            .optional()
            .isArray({ min: 1 }).withMessage('Si envía actores, debe ser un arreglo con al menos uno'),

        check('generos')
            .optional()
            .isArray({ min: 1 }).withMessage('Si envía géneros, debe ser un arreglo con al menos uno'),

        // Validación de objeto anidado: Cartelera
        check('cartelera.fecha_inicio')
            .optional()
            .isISO8601().withMessage('La fecha de inicio debe ser una fecha válida (ISO8601)'),

        check('cartelera.fecha_fin')
            .optional()
            .isISO8601().withMessage('La fecha de fin debe ser una fecha válida (ISO8601)')
            .custom((value, { req }) => {
                // Solo validamos la lógica de fechas si AMBAS están presentes en la petición
                const fechaInicio = req.body.cartelera?.fecha_inicio;
                if (value && fechaInicio) {
                    if (new Date(value) < new Date(fechaInicio)) {
                        throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
                    }
                }
                return true;
            }),

        // Validación de objeto anidado: Data
        check('data.trailer')
            .optional()
            .isURL().withMessage('El trailer debe ser una URL válida'),

        check('data.banner')
            .optional()
            .isURL().withMessage('El banner debe ser una URL válida')
    ]
};