const express = require('express')
const router = new express.Router()
const User = require('../models/user')
router.post('/u', async(req, res) => {
    const me = new User(req.body)
    try {
        await me.save()
        res.status(200).send(me);
    } catch (e) {
        res.status(400).send(e)
    }
});
module.exports = router