const express = require('express');
const moviesController = require('../controllers/moviesController')
const { validarMovie, validarUpdateMovie } = require('../validators/moviesValidator')
const handleValidation = require('../middlewares/handleValidation');
const auth = require("../middlewares/authMiddleware")


const moviesRouter = express.Router();

moviesRouter.post('/',
    // auth,
    validarMovie,
    handleValidation,
    (req, res) => moviesController.crearMovie(req, res)
)

moviesRouter.put('/:id',
    // auth,
    validarUpdateMovie,
    handleValidation,
    (req, res) => moviesController.actualizarMovie(req, res)
)

moviesRouter.delete('/:id',
    // auth,
    (req, res) => moviesController.eliminarMovie(req, res)
)

module.exports = moviesRouter