const express = require('express')
const session = require('express-session')
const app = express()

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./dao/constructors/msjConstructor')
const Container = require('./dao/constructors/prodConstructor')
const {PORT, name} = require('./config/config')

//routers
const masterRoute = require('./routes/masterRoute.js')

console.log(PORT)
console.log(name)

//init server


const connectMongo = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const MongoStorage = connectMongo.create({
    mongoUrl: `${process.env.DB_URL}`,
    mongoOptions: advancedOptions,
    ttl: 600
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('./src/public'))

const passport = require('passport')
app.use(
    session({
        store: MongoStorage,
        secret: 'shhhhhhhhhhhhhh',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60
        },
    })
);
app.use(passport.initialize())
app.use(passport.session())

//routas
app.use('/', masterRoute)

app.get('/', async(req, res) => {
    res.redirect('/product/datos')
})

//server


io.on('connection', async (sockets) => {
    sockets.emit('product', await Container.getProds())
    console.log('Un cliente se ha conectado!: ' + sockets.id)
    // div
    sockets.emit('messages', await Contenedor.getMsg())

    sockets.on('new-product', async data => {
        const name = data.name
        const description = data.description
        const price = data.price
        const stock = data.stock
        const thumbnail = data.thumbnail
        await Container.saveProd({ name, description, price, stock, thumbnail })


        io.sockets.emit('product', await Container.getProds())
    })
    sockets.on('new-message', async dato => {
        console.log(dato)
        const email = dato.email
        const text = dato.text
        const fecha = dato.fecha
        const hora = dato.hora

        await Contenedor.saveMsj(email, text, fecha, hora)

        io.sockets.emit('messages', await Contenedor.getMsg())
    })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.on('error', error => console.log(`Error en servidor ${error}`))