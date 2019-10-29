const mongoose = require('mongoose')
const v = require('validator')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userEsquema.pre('save', async function(next) { //post
    const user = this
        // console.log('j', user.isModified('pase'));
        // if (!user.isModified('pase')) return next()
    if (user.isModified('pase')) {
        user.pase = await crypt.hash(user.pase, 8)
    }
    next()
})
userEsquema.statics.findC = async(c, pase) => {
    const user = await User.findOne({ correo: c }) //
    const esV = await crypt.compare(pase, user.pase)
    if (!esV) { throw new Error('no se pudo loguear') }
    return user;
}
userEsquema.methods.getT = async function() { // 
    const user = this
    const t = jwt.sign({ correo: user.correo }, 'la_llave')
    user.tokens = user.tokens.concat({ token: t })
    await user.save()
    return t
}

// const Usuario = mongoose.model('Usuario', {})
const User = mongoose.model('Usuario', userEsquema)
module.exports = User