const halls = require('../schemas/hallsSchema');

class hallModel {

    async crearHall(data) {
        return await halls.create(data);
    }

    async obtenerHalls() {
        return await halls.find();
    }

    async obtenerHallPorId(id) {
        return await halls.findById(id);
    }

    async obtenerHallPorNombre(nombre) {
        return await halls.findOne({ nombre: nombre });
    }

    async actualizarHall(id, data) {
        return await halls.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminarHall(id) {
        return await halls.findByIdAndDelete(id);
    }

    /**
     * Lógica de Cine: Obtener la disposición de asientos
     * Útil para renderizar el mapa de la sala en el frontend
     */
    async obtenerMapaAsientos(id) {
        const hall = await halls.findById(id).select('asientos');
        return hall ? hall.asientos : null;
    }
}

module.exports = new hallModel();