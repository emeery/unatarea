const mongoose = require('mongoose')

const esquemaTarea = mongoose.Schema({
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    completo: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
})


const Tarea = mongoose.model('Tarea', esquemaTarea)
module.exports = Tarea