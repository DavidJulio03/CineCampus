const userService = require("../../application/services/userService");



class userController {

    async SignUp(req, res) {

        const user = await userService.createLocalUser(req.body);
        
        //Si el service no nos devuelve un error, enviamos la cookie.
        if (user.token) {res.cookie('access_token', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 60 * 60 * 1000, // 1 hora
        })}

        return res.status(user.status).json(user.data)

    }


    async LogIn(req, res) {

        const user = await userService.LogInLocal(req.body);

        //Si el service no nos devuelve un error, enviamos la cookie.
        if (user.token) {res.cookie('access_token', user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 60 * 60 * 1000, // 1 hora
        })}

        return res.status(user.status).json(user.data)

    }

    
    async authMe(req, res) {

        const user = await userService.authMe(req.user.email);
        return res.status(user.status).json(user.data)

    }

}

module.exports = new userController();