'use strict';

module.exports = {
    inserir,
    selecionar,
    selecionarPorId,
    atualizar,
    remover
}

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

async function inserir(body) {
    const order = new Order(body);
    await order.save();
    return { id: order.id }
}

async function selecionar() {
    const res = await Order.find({});
    return res;
}

async function selecionarPorId(id) {
    const res = await Order.findById(id)
        .populate('costumer', 'name cpf') // Faz com que o mongo retorne as informações do model referenciado, e tbm é possível passar os campos que quer receber
        .populate('itens.product', 'title price');
    return res;
}

async function atualizar(id, body) {
    await Order.findByIdAndUpdate(id, {
        $set: {
            costumer: body.costumer,
            atualizationDate: Date.now(),
            status: body.status,
            itens: body.itens
        }
    });
}

async function remover(id) {
    await Order.findByIdAndRemove(id);
}