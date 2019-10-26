const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
router.post('/u', async(req, res) => {
    const me = new User(req.body)
    try {
        await me.save()
        res.status(200).send(me);
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/us', async(req, res) => {
    try {
        const us = await User.find({})
        res.send(us)
    } catch (e) {
        res.send(500).send()
    }
})
router.get('/u/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send()
        }
        const user = await User.findById(_id)
        res.send(user);
    } catch (e) {
        res.status(500).send(e)
    }
})
router.patch('/u/:id', async(req, res) => {
    const _id = req.params.id;
    const campos = Object.keys(req.body)
    const camposP = ['nombre', 'correo', 'edad', 'pase']
    const esValido = campos.every(c => camposP.includes(c))
    if (!esValido) { return res.status(400).send({ e: 'updte invalido' }) }
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) { return res.status(404).send() }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})
router.delete('/u/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) { return res.status(404).send() } // null
        res.send(user);
    } catch (e) {
        res.status(500).send()
    }
});
module.exports = router