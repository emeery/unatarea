const express = require('express')
const router = new express.Router()
const mongoose = require('mongoose')
const Tarea = require('../models/tarea')
router.post('/t', async(req, res) => {
    const t = new Tarea(req.body)
    try {
        await t.save()
        res.status(201).send(t)
    } catch (e) {
        res.status(400).send(e)
    }
});
router.get('/ts', async(req, res) => {
    try {
        const tsks = await Tarea.find({})
        res.status(200).send(tsks)
    } catch (e) {
        res.status(500).send()
    }
});
router.get('/t/:id', async(req, res) => {
    const _id = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send()
        }
        const t = await Tarea.findById(_id)
        res.send(t);
    } catch (e) {
        res.status(500).send(e)
    }
});
router.patch('', async(req, res) => {

});
module.exports = router