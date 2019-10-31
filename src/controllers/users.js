const express = require('express')
const mongoose = require('mongoose')
const router = new express.Router()
const User = require('../models/user')
const aut = require('../middleware/aut')
router.post('/u/signup', async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.getT()
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/u/me', aut, async(req, res) => {
    res.send(req.userr);
})
router.post('/u/login', async(req, res) => {
    try {
        const user = await User.findC(req.body.correo, req.body.pase)
        const token = await user.getT()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send({ m: 'crede I' })
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