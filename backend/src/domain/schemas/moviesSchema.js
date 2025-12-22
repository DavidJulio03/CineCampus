const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({

    nombre: {
        
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    descripcion: {
        type: String,
        required: true,
    },

    autores: {
        type: Array,
        required: true
    },

    actores: {
        type: Array,
        required: true
    },

    generos: {
        type: Array,
        required: true
    },

    cartelera: {
        fecha_inicio: {
            type: Date,
            required: true
        },
        fecha_fin: {
            type: Date,
            required: true
        }
    },

    data: {
        trailer: {
            type: String,
            unique: true,
            required: true
        },
        banner: {
            type: String,
            unique: true,
            required: true
        }
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.models.movies || mongoose.model("movies", moviesSchema);