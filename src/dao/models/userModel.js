const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    age: { type: String, required: true},
    avatar: { type: String, required: true},
    password: { type: String, required: true},
    phone: { type: String, required: true, unique: true},
    direction: { type: String, required: true}
})

const users = mongoose.model(userCollection, userSchema);

module.exports = users;