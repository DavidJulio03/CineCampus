const movies = require('../schemas/moviesSchema');

class movieModel {

    async crearMovie(data) {
        return await movies.create(data);
    }

    async obtenerMovies() {
        return await movies.find();
    }

    async obtenerMoviePorId(id) {
        return await movies.findById(id);
    }

    async obtenerMoviePorNombre(nombre) {
        return await movies.find({ nombre: new RegExp(nombre, 'i') });
    }

    async obtenerPeliculasEnCartelera() {
        const hoy = new Date();
        return await movies.find({
            "cartelera.fecha_inicio": { $lte: hoy },
            "cartelera.fecha_fin": { $gte: hoy }
        });
    }

    async actualizarMovie(id, data) {
        return await movies.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminarMovie(id) {
        return await movies.findByIdAndDelete(id);
    }
}

module.exports = new movieModel();