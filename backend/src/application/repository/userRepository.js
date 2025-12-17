const userModel = require('../../domain/models/userModel');

const { SuccessResponse, ErrorResponse } = require('../utils/respuestasHTTP');
const MongoErrorHandler = require('../utils/handlers/mongoErrorHandler');


class userRepository {


    async obtenerUsersRepository() {

        try {

            const users = await userModel.obtenerUsers();
            return new SuccessResponse(201, users)
            
        } catch (error) {

            return MongoErrorHandler.handleError(error)
            
        }
        
    }


    async obtenerUserPorId(id) {

        try {

            const user = await userModel.obtenerUserPorId(id);
            if (user == null) { return new ErrorResponse(404, 'No se encontro un usuario con ese id') }

            return new SuccessResponse(200, user)
            
        } catch (error) {

            return MongoErrorHandler.handleError(error)
            
        }
        
    }


    async obtenerUserPorEmail(email) {

        try {

            const user = await userModel.obtenerUserPorEmail(email);
            if (user == null) { return new ErrorResponse(404, 'No se encontro ningun usuario con ese email') }

            return new SuccessResponse(200, user)
            
        } catch (error) {

            return MongoErrorHandler.handleError(error)
            
        }
        
    }


    async crearUsuarioRepository(data) {

        try {

            const user = await userModel.crearUser(data);
            return new SuccessResponse(201, user)
            
        } catch (error) {

            return MongoErrorHandler.handleError(error)
            
        }
        
    }


    async actualizarUserRepository(id, data) {

        try {

            const user = await userModel.actualizarUser(id, data);
            return new SuccessResponse(200, user)
            
        } catch (error) {

            return MongoErrorHandler.handleError(error)
            
        }
        
    }


    async eliminarUserRepository(id, data) {

        try {

            const user = await userModel.eliminarUser(id);
            return new SuccessResponse(200, user)
            
        } catch (error) {

            return MongoErrorHandler.handleError(error)
            
        }
        
    }


}

module.exports = new userRepository()