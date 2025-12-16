const users = require('../schemas/userSchema');

class userModel {

    async crearUser(data) {
        return await users.create(data);
    }

    async obtenerUsers() {
        return await users.find();
    }

    async obtenerUserPorId(id) {
        return await users.findById(id);
    }

    async obtenerUserPorEmail(email) {
        return await users.findOne({ email: email });
    }

    async actualizarUser(id, data) {
        return await users.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminarUser(id) {
        return await users.findByIdAndDelete(id);
    }
}

module.exports = new userModel();