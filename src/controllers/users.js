const express = require('express')
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
})
router.post('/u/logout', aut, async(req, res) => {
    try {
        // req.tokenn, req.userr.tokens
        req.userr.tokens = req.userr.tokens.filter(t => {
            return t.token !== req.tokenn // sin tokenn
        })
        await req.userr.save()
        res.send('logout')
    } catch (e) { res.status(500).send(e) }
})
router.post('/u/logoutall', aut, async(req, res) => {
    try {
        req.userr.tokens = []
        await req.userr.save()
        res.send()
    } catch (e) { res.status(500).send() }
});
// router.p(/:id)
router.patch('/u/me', aut, async(req, res) => {
    const campos = Object.keys(req.body)
    const camposP = ['nombre', 'correo', 'edad', 'pase']
    const esV = campos.every(c => camposP.includes(c))
    if (!esV) { return res.status(400).send({ m: 'no update :(' }) }
    try { // ey
        campos.forEach(c => req.userr[c] = req.body[c]) // s
        await req.userr.save()
        res.send(req.userr)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/u/me', aut, async(req, res) => {
    try {
        await req.userr.remove()
        res.send(req.userr)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router