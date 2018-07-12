'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number: {
        type: String,
        required: true,
        unique: true,
    },
    costumer: {
        // Referencia um outro objeto
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Costumer'
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    atualizationDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'], // Define as opções possíveis para este campo
        default: 'created'
    },
    itens: [{
        quantity: {
            type: Number,
            require: true,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
});

module.exports = mongoose.model('Order', schema);