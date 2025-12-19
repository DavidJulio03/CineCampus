const mongoose = require("mongoose");

const carteleraSchema = new mongoose.Schema({

    movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true
    },

    hall_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "halls",
        required: true
    },

    fecha: {
        fecha_inicio: {
            type: Date,
            required: true
        },
        fecha_fin: {
            type: Date,
            required: true
        }
    },

    asientos: {
        type: [[String]],
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.models.cartelera || mongoose.model("cartelera", carteleraSchema);