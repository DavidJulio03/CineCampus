const movieModel = require('../../domain/models/moviesModel');
const { SuccessResponse, ErrorResponse } = require('../utils/respuestasHTTP');
const MongoErrorHandler = require('../utils/handlers/mongoErrorHandler');

class movieRepository {

    async crearMovieRepository(data) {

        try {

            const movie = await movieModel.crearMovie(data);
            return new SuccessResponse(201, movie);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerMoviesRepository() {

        try {

            const movies = await movieModel.obtenerMovies();
            return new SuccessResponse(200, movies);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerMoviePorIdRepository(id) {

        try {

            const movie = await movieModel.obtenerMoviePorId(id);
            if (!movie) {
                return new ErrorResponse(404, 'No se encontró una película con ese ID');
            }

            return new SuccessResponse(200, movie);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerMoviePorNombreRepository(nombre) {

        try {

            const movies = await movieModel.obtenerMoviePorNombre(nombre);
            if (movies.length === 0) {
                return new ErrorResponse(404, 'No se encontraron películas con ese nombre');
            }

            return new SuccessResponse(200, movies);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerPeliculasEnCarteleraRepository() {

        try {

            const movies = await movieModel.obtenerPeliculasEnCartelera();
            return new SuccessResponse(200, movies);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async actualizarMovieRepository(id, data) {

        try {

            const movie = await movieModel.actualizarMovie(id, data);
            if (!movie) {
                return new ErrorResponse(404, 'No se encontró la película para actualizar');
            }

            return new SuccessResponse(200, movie);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async eliminarMovieRepository(id) {

        try {

            const movie = await movieModel.eliminarMovie(id);
            if (!movie) {
                return new ErrorResponse(404, 'No se encontró la película para eliminar');
            }

            return new SuccessResponse(200, { mensaje: 'Película eliminada correctamente', movie });

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

}

module.exports = new movieRepository();