'use strict';

module.exports = {
    inserir,
    selecionar,
    selecionarPorSlug,
    selecionarPorId,
    selecionarPorTags,
    atualizar,
    atualizarPorSlug,
    remover,
    removerPorSlug
}

const mongoose = require('mongoose'); // Pega as referencias para o mongo
const Product = mongoose.model('Product'); // Permite usar a model products para as querys

async function inserir(body) {
    const product = new Product(body);
    await product.save();
}

async function selecionar() {
    const res = await Product.find({ active: true }, 'title price slug'); // Primeiro parametro são os params de busca, segundo são os campos que deseja trazer
    return res;
}

async function selecionarPorSlug(slug) {
    const res = await Product.findOne({ slug: slug });
    return res;
}

async function selecionarPorId(id) {
    const res = await Product.findById(id);
    return res;
}

async function selecionarPorTags(tags) {
    const res = await Product.find({ tags: tags });
    return res;
}

async function atualizar(id, body) {
    // Procura por id e seta as informações
    await Product.findByIdAndUpdate(id, {
        // Campos que serão alterados
        $set: {
            title: body.title,
            description: body.description,
            price: body.price,
            active: body.active,
            slug: body.slug,
            image: body.image
        }
    })
}

async function atualizarPorSlug(slug, body) {
    // Procura por id e seta as informações
    await Product.findOneAndUpdate(slug, {
        // Campos que serão alterados
        $set: {
            title: body.title,
            description: body.description,
            price: body.price,
            active: body.active
        }
    })
}

async function remover(id) {
    await Product.findByIdAndRemove(id);
}

async function removerPorSlug(slug) {
    await Product.findOneAndRemove({ slug: slug })
}