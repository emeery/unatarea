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
router.get('/listausuarios', async(req, res) => {
    try {
        const us = await User.find({})
        res.send(us)
    } catch (e) {
        res.send(500).send()
    }
})
router.post('/u/login', async(req, res) => {
    try {
        const user = await User.findC(req.body.correo, req.body.pase)
        res.send(user);
    } catch (e) {
        res.status(400).send()
    }
});
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
    const campos = Object.keys(req.body)
    const camposP = ['nombre', 'correo', 'edad', 'pase']
    const esV = campos.every(c => camposP.includes(c))
    if (!esV) { return res.status(400).send({ m: 'no update :(' }) }
    try {
        const user = await User.findById(req.params.id)
        campos.forEach(c => user[c] = req.body[c]) // s
        await user.save()
        if (!user) { return res.status(404).send({ m: 'user not found' }) }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/u/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) { return res.status(404).send({ m: 'user not found' }) } // null
        res.send({ m: 'file deleted' });
    } catch (e) {
        res.status(500).send(e)
    }
});
module.exports = router