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

moviesRouter.get('/',
    // auth,
    (req, res) => moviesController.obtenerMovies(req, res)
)

moviesRouter.get('/:id',
    // auth,
    (req, res) => moviesController.obtenerMoviePorId(req, res)
)

moviesRouter.get('/nombre/:nombre',
    // auth,
    (req, res) => moviesController.obtenerMoviePorNombre(req, res)
)

moviesRouter.get('/cartelera/activo',
    // auth,
    (req, res) => moviesController.obtenerMoviesCartelera(req, res)
)

module.exports = moviesRouter