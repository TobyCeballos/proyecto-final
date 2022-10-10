
const express = require("express")
const { Router } = express
const generalRouter = new Router()
const cart = require('./cartsRoutes')
const users = require('./userRoutes')
const product = require('./prodsRoutes')
const auth = require('./passportRoute')

generalRouter.use('/', auth)
generalRouter.use('/users', users)
generalRouter.use('/cart', cart)
generalRouter.use('/product', product)

module.exports = generalRouter