const mongoose = require('mongoose');

const msjCollection = 'mensajes';

const msjSchema = new mongoose.Schema({
    email: {type: String},
    text : {type: String, required: true},
    fecha: { type: String, required: true},
    hora: {type: String, required:true}
})

const productos = mongoose.model(msjCollection, msjSchema);

module.exports = productos;