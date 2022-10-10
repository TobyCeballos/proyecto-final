const express = require('express')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')

const usersList = require('../dao/constructors/userConstructor')
//---------------------------------------------------//
const { Router } = express
const passportRoute = new Router()

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const usuario = await usersList.getUser(email)
    console.log(usuario)
    if (usuario) {
        return done(null, false)
    } else {
        const user = req.body.user
        const age = req.body.age
        const avatar = req.body.avatar
        const phone = req.body.phone
        const direction = req.body.direction
        const asunto = 'Nuevo usuario registrado en CRM - Chat'
        const mensaje = `El usuario ${user} se ha registrado.
        Informe del registro:
        - Usuario: ${user}
        - Edad: ${age}
        - Avatar: ${avatar}
        - Teléfono: ${phone}
        - Dirección: ${direction}
        - Correo: ${email}`
        const mail = await sendMailToAdmin(asunto, mensaje)
        const saved = await usersList.saveUser({ user, email, age, avatar, phone, password, direction });
        done(null, saved);
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await usersList.getUser(email);
    if (user.email != email) {
        return done(null, false);
    }
    if (password != user.password) {
        return done(null, false);
    }
    return done(null, user);
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});



passportRoute.get('/register', async (req, res) => {
    res.render('register')
})

passportRoute.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/login' }))

passportRoute.get('/failregister', async (req, res) => {
    res.render('register-error')
})

//---------------------------------------------------//
// RUTAS LOGIN

passportRoute.get('/login', async (req, res) => {
    res.render('login')
})

passportRoute.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/product/datos' }))

passportRoute.get('/faillogin', async (req, res) => {
    res.render('login-error')
})


module.exports = passportRoute