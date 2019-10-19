const express = require('express')
require('./db/mongoose')

const tareasRouter = require('./controllers/tareas')
const usersRouter = require('./controllers/user')


const app = express()
const port = process.env.PORT || 8082

// app.use(express.json())
app.use(tareasRouter);
app.use(usersRouter);



app.listen(port, () => {
    console.log('servidor is up' + port)
})