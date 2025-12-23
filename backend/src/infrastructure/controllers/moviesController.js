const moviesRepository = require("../../application/repository/moviesRepository");



class moviesController {

    async crearMovie(req, res) {

        const movie = await moviesRepository.crearMovieRepository(req.body)
        return res.status(movie.status).json(movie)

    }

    async actualizarMovie(req, res) {
        
        const movie = await moviesRepository.actualizarMovieRepository(req.params.id, req.body)
        return res.status(movie.status).json(movie)

    }

    async eliminarMovie(req, res) {
        
        const movie = await moviesRepository.eliminarMovieRepository(req.params.id)
        return res.status(movie.status).json(movie)

    }

    async obtenerMovies(req, res) {
        
        const movie = await moviesRepository.obtenerMoviesRepository()
        return res.status(movie.status).json(movie)

    }

    async obtenerMoviePorId(req, res) {
        
        const movie = await moviesRepository.obtenerMoviePorIdRepository(req.params.id)
        return res.status(movie.status).json(movie)

    }

    async obtenerMoviePorNombre(req, res) {
        
        const movie = await moviesRepository.obtenerMoviePorNombreRepository(req.params.nombre)
        return res.status(movie.status).json(movie)

    }

    async obtenerMoviesCartelera(req, res) {
        
        const movie = await moviesRepository.obtenerPeliculasEnCarteleraRepository()
        return res.status(movie.status).json(movie)

    }

}

module.exports = new moviesController();