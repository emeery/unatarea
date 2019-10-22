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
module.exports = router