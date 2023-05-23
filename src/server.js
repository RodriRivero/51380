import { __dirname } from './utils.js'
import apiRouter from "./router/api.routes.js"
import express from 'express'
import handlebars from 'express-handlebars'
import { initSockets } from './socket/socketServer.js'
import path from 'path';
import viewRouter from './router/view.routes.js'


const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// MULTER
app.use(express.static( 'src/public'));

app.use('/api', apiRouter)
app.use('/', viewRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server up and running on port http://localhost:${PORT}`)
})
// SOCKET IO
initSockets(httpServer)


