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
    }
})

esquemaTarea.pre('save', async function(next) {
    console.log('ju', this);
})

const Tarea = mongoose.model('Tarea', esquemaTarea)
module.exports = Tarea