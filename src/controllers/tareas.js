const express = require('express')
const router = new express.Router()
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
module.exports = router