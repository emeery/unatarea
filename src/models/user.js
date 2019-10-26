const mongoose = require('mongoose')
const v = require('validator')
const userEsquema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5,
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
    edad: {
        type: Number,
        default: 0,
        validate(e) {
            if (e < 0) { throw new Error('la edad deb ser positiva') }
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

userEsquema.pre('save', async function(next) {
    const user = this

})

const Usuario = mongoose.model('Usuario', userEsquema)
    // const Usuario = mongoose.model('Usuario', {})
module.exports = Usuario