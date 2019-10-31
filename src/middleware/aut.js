const jwt = require('jsonwebtoken')
const User = require('../models/user')
module.exports = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, 'la_llave')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log('userr', user);
        if (!user) { throw new Error }
        req.userr = user
        next()
    } catch (e) { res.status(401).send('please aut'); }
}