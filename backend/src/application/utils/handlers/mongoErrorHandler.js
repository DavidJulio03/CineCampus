const { ErrorResponse } = require('../respuestasHTTP')



class MongoErrorHandler {

    /**
     * Procesa un objeto de error de Mongoose/Mongo y devuelve un ErrorResponse.
     * @param {Error} error - El objeto de error generado por la consulta.
     * @returns {ErrorResponse} - Un objeto de respuesta de error estandarizado.
     */

    static handleError(error) {

        console.log(error)

        if (error.name === 'ValidationError') {

            // Error 400: Validación de esquema fallida (ej. campo requerido faltante)
            return new ErrorResponse(
                400,
                'Error de validación de datos.',
                error.message
            );

        }

        if (error.code && error.code === 11000) {

            // Error 409: Clave duplicada (ej. intentar crear un documento con un valor que ya existe y es único)
            const field = Object.keys(error.keyValue).join(', ');
            return new ErrorResponse(
                409,
                `El valor para el campo '${field}' ya existe. Debe ser único.`,
                error.keyValue
            );

        }

        if (error.name === 'CastError') {

            // Error 400/404: Fallo al convertir un ID (ej. 'findById' con un ID mal formado)
            const isNotFound = error.kind === 'ObjectId';
            const status = isNotFound ? 404 : 400;
            const message = isNotFound 
                ? 'Recurso no encontrado o ID inválido.' 
                : `Error de formato en el campo '${error.path}'.`;

            return new ErrorResponse(
                status,
                message,
                error.message
            );

        }
        
        // Error genérico 500
        return new ErrorResponse(
            500,
            'Error interno del servidor. No se pudo completar la operación.',
            error.message
        );
        
    }

}

module.exports = MongoErrorHandler;