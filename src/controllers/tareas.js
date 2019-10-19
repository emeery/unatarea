const express = require('express')
const router = express.Router()
const Tarea = require('../models/tarea')
router.post('/t', async(req, res) => {
    const t = await new Tarea({
        descripcion: 'Tomar Partido',
        completo: true
    })
    try {
        t.save()
        res.status(201).send(t)
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router