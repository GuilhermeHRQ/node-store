'use strict';

module.exports = {
    inserir,
    selecionar,
    selecionarPorId,
    atualizar,
    remover,
}

const repository = require('../repositories/costumer-repository');
// const sendEmail = require('../services/email-service');
const mailer = require('../services/nodemailer-service');
const md5 = require('md5');
const auth = require('../services/auth-service');

function handleError(res, e) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição',
        error: e
    });
}

async function inserir(req, res, next) {
    try {
        await repository.inserir({
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) // Função para criar uma md5 da senha para tornar mais seguro
        });

        // Monta objeto para envio do email
        const emailData = {
            to: req.body.email,
            subject: 'Seja Bem vindo a Node Store',
            html: 'Agradecemos muito em ter você como o nosso mais novo cliente, ' + req.body.name  
        }

        // Executa a função de envio do email
        mailer(emailData);

        res.status(201).send({
            message: 'OK'
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
        const body = {
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
        }
        await repository.atualizar(req.params.id, body);
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
