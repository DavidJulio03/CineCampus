const carteleraModel = require('../../domain/models/carteleraModel'); // Ajusta la ruta según tu proyecto
const { SuccessResponse, ErrorResponse } = require('../utils/respuestasHTTP');
const MongoErrorHandler = require('../utils/handlers/mongoErrorHandler');

class carteleraRepository {

    async crearFuncionRepository(data) {

        try {

            const funcion = await carteleraModel.crearFuncion(data);
            return new SuccessResponse(201, funcion);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerCarteleraCompletaRepository() {

        try {

            const funciones = await carteleraModel.obtenerCarteleraCompleta();
            return new SuccessResponse(200, funciones);

        } catch (error) {

            return MongoErrorHandler.handleError(error);
        }

    }

    async obtenerFuncionPorIdRepository(id) {

        try {

            const funcion = await carteleraModel.obtenerFuncionPorId(id);
            if (!funcion) {
                return new ErrorResponse(404, 'No se encontró la función solicitada');
            }

            return new SuccessResponse(200, funcion);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerFuncionesPorPeliculaRepository(movieId) {

        try {

            const funciones = await carteleraModel.obtenerFuncionesPorPelicula(movieId);
            if (funciones.length === 0) {
                return new ErrorResponse(404, 'No hay funciones programadas para esta película');
            }

            return new SuccessResponse(200, funciones);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerFuncionesPorSalaRepository(hallId) {

        try {

            const funciones = await carteleraModel.obtenerFuncionesPorSala(hallId);
            if (funciones.length === 0) {
                return new ErrorResponse(404, 'No hay funciones programadas en esta sala');
            }

            return new SuccessResponse(200, funciones);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async actualizarFuncionRepository(id, data) {

        try {

            const funcion = await carteleraModel.actualizarFuncion(id, data);
            if (!funcion) {
                return new ErrorResponse(404, 'No se encontró la función para actualizar');
            }

            return new SuccessResponse(200, funcion);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async actualizarAsientosRepository(id, nuevosAsientos) {

        try {

            const funcion = await carteleraModel.actualizarAsientos(id, nuevosAsientos);
            if (!funcion) {
                return new ErrorResponse(404, 'No se pudo actualizar los asientos, función no encontrada');
            }

            return new SuccessResponse(200, funcion);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }
    }

    async eliminarFuncionRepository(id) {

        try {

            const funcion = await carteleraModel.eliminarFuncion(id);
            if (!funcion) {
                return new ErrorResponse(404, 'No se encontró la función para eliminar');
            }

            return new SuccessResponse(200, { mensaje: 'Función eliminada de la cartelera' });

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }
    
}

module.exports = new carteleraRepository();