const express = require('express')
require('./db/mongoose') // db
const tareasRouter = require('./controllers/tareas')
const usersRouter = require('./controllers/users')

const app = express()
const p = process.env.PORT || 8082

app.use(express.json()) // u
app.use(tareasRouter)
app.use(usersRouter)
const T = require('./models/tarea')
const U = require('./models/user')
const ut = async() => {
    // const t = await T.findById('5de5c2a5efd1c83fc4f36c22')
    // const u = await U.findById('5de5c00befd1c83fc4f36c1e')
    // await u.populate('tareap').execPopulate()
    // console.log('u', u.tareap);
    // console.log('t1', t);
    // await t.populate('usersillo').execPopulate()
    // console.log('t2', t);
}
ut()
app.listen(p, () => {
    console.log('servidor up' + p)
})