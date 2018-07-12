'use strict';

module.exports = {
    inserir,
    selecionar,
    selecionarPorId,
    atualizar,
    remover
}

const repository = require('../repositories/order-repository');
const uuidv1 = require('uuid/v1');
const auth = require('../services/auth-service');

function handleError(res, e) {
    res.status(500).send({
        error: e
    });
}

async function inserir(req, res, next) {
    try {
        const dadosCostumer = await auth.decodeToken(req.headers['authorization']); // Pega os dados do costumer pelo token

        const data = await repository.inserir({
            number: uuidv1().substring(0, 8),
            costumer: dadosCostumer.id,
            itens: req.body.itens
        });
        res.status(201).send({
            message: 'OK',
            content: data
        });
    } catch (e) {
        handleError(res, e);
    }
}

async function selecionar(req, res, next) {
    try {
        const data = await repository.selecionar();
        res.status(200).send({
            content: data
        });
    } catch (e) {
        handleError(res, e);
    }
}

async function selecionarPorId(req, res, next) {
    try {
        const data = await repository.selecionarPorId(req.params.id);
        res.status(200).send({
            content: data
        });
    } catch (e) {
        handleError(res, e);
    }
}

async function atualizar(req, res, next) {
    try {
        await repository.atualizar(req.params.id, req.body);
        res.status(200).send({
            message: 'OK'
        });
    } catch (e) {
        handleError(res, e);
    }
}

async function remover(req, res, next) {
    try {
        await repository.remover(req.params.id);
        res.status(200).send({
            message: 'OK'
        });
    } catch (e) {
        handleError(res, e);
    }
}