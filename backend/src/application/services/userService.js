const userRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { ErrorResponse } = require('../utils/respuestasHTTP');
const JWTService = require('../utils/JWTService');



class userService {

    async createLocalUser(data) {

        try {
        
            // 1. Hasheamos la contraseña
            const HashedPassword = await bcrypt.hash(data.password, 10);
            data.password = HashedPassword
            
            const user = await userRepository.crearUsuarioRepository(data);
            if (user.status !== 201) {return user}

            // 2. Si se guarda el usuario en la db, preparamos la info que enviamos al front

            const userData = {
                _id: user.data._id,
                email: user.data.email,
                nombre: user.data.nombre
            }

            user.data = userData            
            user.token = JWTService.generateToken({
                sub: userData._id,
                email: userData.email
            })

            return user

            
        } catch (error) {

            return new ErrorResponse(500, '', error)

        }

    }


    async LogInLocal(data) {

        try {

            //1. Obtenemos al usuario
            const user = await userRepository.obtenerUserPorEmail(data.email);
            if (user.status !== 200) {return user}

            //2. Si existe, verificamos la contraseña
            const passCorrecta = await bcrypt.compare(data.password, user.data.password)
  
            
            //3. Si es la misma, devolvemos el token para la cookie
            const userData = {
                _id: user.data._id,
                email: user.data.email,
                nombre: user.data.nombre
            }

            user.data = userData  
            user.token = JWTService.generateToken({
                sub: userData._id,
                email: userData.email
            })

            return user
            
        } catch (error) {
            
            return new ErrorResponse(500, '', error)
            
        }

    }

    
    async authMe(email) {

        try {

            const user = await userRepository.obtenerUserPorEmail(email);
            const { password, ...userSinPassword } = user.data.toObject();
            user.data = userSinPassword

            return user
            
        } catch (error) {
            
            return new ErrorResponse(500, '', error)
            
        }

    }

}

module.exports = new userService()