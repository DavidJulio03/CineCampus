const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { ErrorResponse } = require('../utils/respuestasHTTP');



class userService {

    async createLocalUser(data) {

        try {

            data.googleId = null;
            data.authProvider = 'local';

            const HashedPassword = await bcrypt.hash(data.password, 10);
            data.password = HashedPassword
            
            const user = await userRepository.crearUsuarioRepository(data);
            return user
            
        } catch (error) {

            return new ErrorResponse(500, '', error)

        }

    }

}

module.exports = new userService()