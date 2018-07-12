'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // _id: O schema cria automaticamente o id do item
    title: {
        type: String,
        required: true,
        trim: true // Remove os espaços em branco
    },
    slug: { // Batata frita = batata-frita
        type: String,
        required: [true, 'Slug é obrigatório'],
        trim: true,
        index: true, // será um indice do documento, parametro de busca
        unique: true // não pode repetir
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true // valor default
    },
    //Permite ser um array, assim, inserir vários itens neste campo
    tags: [{
        type: String,
        required: true
    }],
    image: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Product', schema); // Para criar a model deve ser passado o nome da model e o schema que ela usa