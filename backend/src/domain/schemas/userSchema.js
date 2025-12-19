const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local';
        }
    },

    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true,
        default: undefined 
    },

    membresia: {
        type: String,
        required: true,
        enum: ['Ninguna', 'VIP'],
        default: 'Ninguna'
    },

    cupones_activos: {
        type: Array,
        required: true
    },

    tickets_activos: {
        type: Array,
        required: true
    },

    historial_tickets: {
        type: Array,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.models.users || mongoose.model("users", userSchema);