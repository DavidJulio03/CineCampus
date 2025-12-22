const cartelera = require('../schemas/carteleraSchema');

class carteleraModel {

    async crearFuncion(data) {
        return await cartelera.create(data);
    }

    async obtenerCarteleraCompleta() {
        return await cartelera.find()
            .populate('movie_id')
            .populate('hall_id');
    }

    async obtenerFuncionPorId(id) {
        return await cartelera.findById(id)
            .populate('movie_id')
            .populate('hall_id');
    }

    async obtenerFuncionesPorPelicula(movieId) {
        return await cartelera.find({ movie_id: movieId })
            .populate('hall_id');
    }

    async obtenerFuncionesPorSala(hallId) {
        return await cartelera.find({ hall_id: hallId })
            .populate('movie_id');
    }

    async actualizarFuncion(id, data) {
        return await cartelera.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Lógica de Cine: Actualizar estado de asientos
     * Útil cuando un usuario compra un ticket y el asiento pasa de "disponible" a "ocupado"
     */
    async actualizarAsientos(id, nuevosAsientos) {
        return await cartelera.findByIdAndUpdate(
            id, 
            { $set: { asientos: nuevosAsientos } }, 
            { new: true }
        );
    }

    async eliminarFuncion(id) {
        return await cartelera.findByIdAndDelete(id);
    }
}

module.exports = new carteleraModel();