const mongoose = require("mongoose");

const hallsSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    asientos: {
        type: [[String]], 
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.models.halls || mongoose.model("halls", hallsSchema);