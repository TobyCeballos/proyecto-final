
const express = require("express")
const { Router } = express
const userRouter = new Router()

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

userRouter.get('/account', isAuth, async(req, res) => {
    const email = req.user.email
    const avatar = req.user.avatar
    const user = req.user.user
    const phone = req.user.phone
    const direction = req.user.direction
    const age = req.user.age
    
    const datos = { email, avatar, user, phone, direction, age}
    res.render('account', {datos})
})

module.exports = userRouter