const mongoose = require('mongoose');

const models = require('../models/msjModel');

const moment = require('moment');


require('dotenv').config()
mongoose.connect(`${process.env.DB_URL}`)


class Contenedor {
    constructor(){
        this.collection = models;
    }

    async saveMsj(email, mensaje, fecha, hora){

        const newMsg = {
            email: email,
            text: mensaje,
            fecha: fecha,
            hora: hora
        }

        const saves = await this.collection.insertMany(newMsg)
        return saves
    };

    async getMsg(){
        const gets = await this.collection.find()
        return gets
    }
};


const message = new Contenedor()
module.exports = message;