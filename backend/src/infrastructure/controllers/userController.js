const userService = require("../../application/services/userService");



class userController {

    async crearUser(req, res) {

        const user = await userService.createLocalUser(req.body);
        return res.status(user.status).json(user)

    }

}

module.exports = new userController();