const express = require('express')
const router = new express.Router()
const User = require('../models/user')
router.post('/u', async(req, res) => {
    const me = new User({
        nombre: 'Jerry Live',
        correo: 'jerry@live.com.mx',
        pase: 'jejeje'
    })
    try {
        await me.save()
        res.status(200).send(me);
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router