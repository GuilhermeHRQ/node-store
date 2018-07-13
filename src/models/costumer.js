'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'CPF já cadastrado']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, 'Email já cadastrado']
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Costumer', schema);