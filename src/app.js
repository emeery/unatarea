const express = require('express')
require('./db/mongoose') //db
const tareasRouter = require('./controllers/tareas')
const usersRouter = require('./controllers/users')
const jwt = require('jsonwebtoken')

const app = express()
const p = process.env.PORT || 8082

app.use(express.json()) // u
app.use(tareasRouter);
app.use(usersRouter);

// const ut = async() => {
//     try {
//         const plod = { je: 'jeje', ji: 'jiji' }
//         const t = jwt.sign(plod, 'jo')
//         const dec = jwt.verify(t, 'jo')
//         console.log('dec', dec);
//     } catch (e) {
//         console.log('error');
//     }
// }
// ut()
app.listen(p, () => {
    console.log('servidor up' + p)
})