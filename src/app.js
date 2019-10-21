const express = require('express')
require('./db/mongoose') //db

const tareasRouter = require('./controllers/tareas')
const usersRouter = require('./controllers/users')


const app = express()
const p = process.env.PORT || 8082

app.use(express.json()) // u
app.use(tareasRouter);
app.use(usersRouter);

app.listen(p, () => {
    console.log('servidor up' + p)
})