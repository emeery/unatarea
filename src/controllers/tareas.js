const express = require('express')
const Tarea = require('../models/tarea')
const aut = require('../middleware/aut')
const router = new express.Router()
router.post('/t', aut, async(req, res) => {
    const t = new Tarea({
        ...req.body,
        usersillo: req.userr
    })
    try {
        await t.save()
            // await t.populate('tareap').execPopulate()
            // console.log('t', t);
        res.status(201).send(t)
    } catch (e) {
        res.status(400).send(e)
    }
});
router.get('/ts', aut, async(req, res) => {
    try {
        await req.userr.populate('tareap').execPopulate()
        res.status(200).send(req.userr.tareap)
    } catch (e) { res.status(500).send() }
});
router.get('/t/:id', aut, async(req, res) => {
    const _id = req.params.id
    try {
        const t = await Tarea.findOne({ _id, usersillo: req.userr._id })
        if (!t) { return res.status(404).send() }
        res.send(t)
    } catch (e) { res.status(500).send(e) }
});
router.patch('/t/:id', aut, async(req, res) => {
    const _id = req.params.id;
    const campos = Object.keys(req.body)
    const camposP = ['descripcion', 'completo']
    const valido = campos.every(t => camposP.includes(t))
    if (!valido) { return res.status(400).send({ e: 'updte invalido' }) }
    try {
        const t = await Tarea.findOne({
            _id,
            usersillo: req.userr._id
        })
        if (!t) { return res.status(404).send() }
        campos.forEach(c => t[c] = req.body[c])
        await t.save()
        res.send(t);
    } catch (e) { res.status(404).send(e); }
});
router.delete('/t/:id', aut, async(req, res) => {
    try {
        const t = await Tarea.findOneAndDelete({
            _id: req.params.id,
            usersillo: req.userr._id
        })
        if (!t) { return res.status(404).send() }
        res.send(t);
    } catch (e) { res.status(500).send(e) }
});
module.exports = router