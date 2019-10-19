const mongoose = require('mongoose')
const v = require('validator')
const Usuario = mongoose.model('Usuario', {
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        correo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(c) {
                if (!v.isEmail(c)) {
                    throw new Error('correo invalido')
                }
            }
        },
        pase: {
            type: String,
            required: true,
            minlength: 6,
            trim: true,
            validate(p) {
                if (p.toLowerCase().includes('pass')) {
                    throw new Error('el pase no puede tener pass')
                }
            }
        },
    })
    // const Usuario = mongoose.model('Usuario', usuarioEsquema)
module.exports = Usuario