const hallModel = require('../../domain/models/hallsModel');
const { SuccessResponse, ErrorResponse } = require('../utils/respuestasHTTP');
const MongoErrorHandler = require('../utils/handlers/mongoErrorHandler');

class hallRepository {

    async crearHallRepository(data) {

        try {

            const hall = await hallModel.crearHall(data);
            return new SuccessResponse(201, hall);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerHallsRepository() {

        try {

            const halls = await hallModel.obtenerHalls();
            return new SuccessResponse(200, halls);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerHallPorIdRepository(id) {

        try {

            const hall = await hallModel.obtenerHallPorId(id);
            if (!hall) {
                return new ErrorResponse(404, 'No se encontró la sala con el ID proporcionado');
            }

            return new SuccessResponse(200, hall);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerHallPorNombreRepository(nombre) {

        try {

            const hall = await hallModel.obtenerHallPorNombre(nombre);
            if (!hall) {
                return new ErrorResponse(404, `No se encontró una sala llamada: ${nombre}`);
            }

            return new SuccessResponse(200, hall);
            
        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async actualizarHallRepository(id, data) {

        try {

            const hall = await hallModel.actualizarHall(id, data);
            if (!hall) {
                return new ErrorResponse(404, 'No se encontró la sala para actualizar');
            }

            return new SuccessResponse(200, hall);

        } catch (error) {

            return MongoErrorHandler.handleError(error);
            
        }

    }

    async eliminarHallRepository(id) {

        try {

            const hall = await hallModel.eliminarHall(id);
            if (!hall) {
                return new ErrorResponse(404, 'No se encontró la sala para eliminar');
            }

            return new SuccessResponse(200, { mensaje: 'Sala eliminada con éxito' });

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

    async obtenerMapaAsientosRepository(id) {

        try {

            const asientos = await hallModel.obtenerMapaAsientos(id);
            if (!asientos) {
                return new ErrorResponse(404, 'No se pudo encontrar el mapa de asientos para esta sala');
            }

            return new SuccessResponse(200, asientos);

        } catch (error) {

            return MongoErrorHandler.handleError(error);

        }

    }

}

module.exports = new hallRepository();