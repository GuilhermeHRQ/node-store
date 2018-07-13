'use strict';

module.exports = {
    inserir,
    selecionar,
    selecionarPorId,
    atualizar,
    remover,
}

const mongoose = require('mongoose');
const Costumer = mongoose.model('Costumer');

async function inserir(body) {
    const costumer = new Costumer(body);
    await costumer.save();
}

async function selecionar() {
    const res = await Costumer.find({}, 'name cpf email');
    return res;
}

async function selecionarPorId(id) {
    const res = await Costumer.findById(id);
    return res;
}

async function atualizar(id, body) {
    await Costumer.findByIdAndUpdate(id, {
        $set: {
            name: body.name,
            cpf: body.cpf,
            email: body.email,
            roles: body.role
        }
    });
}

async function remover(id) {
    await Costumer.findByIdAndRemove(id);
}

