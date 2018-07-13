'use strict';

module.exports = {
    selecionar,
    selecionarPorSlug,
    selecionarPorId,
    selecionarPorTags,
    inserir,
    atualizar,
    atualizarPorSlug,
    removerPorId,
    removerPorSlug
}

const validationData = require('../validators/validation-data'); // Modulo de validações
const repository = require('../repositories/product-repository'); // Repositorio de funções do banco
const uploadImage = require('../services/azure-storage-service');

function handleError(res) {
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
}

async function inserir(req, res, next) {
    const validation = new validationData();

    // Validações das informações
    validation.isRequired(req.body.title, 'O título do produto é obrigatório!');
    validation.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');

    // Caso tiver alguma info errada
    if (!validation.isValid()) {
        res.status(400).send(validation.errors()).end;
        return;
    }
    try {
        // Faz o upload da imagem no Azure Storage e retorna o nome do arquivo
        // const filename = await uploadImage(req.body.image, 'product-images', 'jpg');

        await repository.inserir({
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            // image: 'https://guilherme.blob.core.windows.net/product-images/' + filename
        });
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        handleError(res);
    }
};

async function selecionar(req, res, next) {
    try {
        const data = await repository.selecionar();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

async function selecionarPorSlug(req, res, next) {
    try {
        const data = await repository.selecionarPorSlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        handleError(res);
    }
}

async function selecionarPorId(req, res, next) {
    try {
        const data = await repository.selecionarPorId(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        handleError(res);
    }
}

async function selecionarPorTags(req, res, next) {
    try {
        const data = await repository.selecionarPorTags(req.params.tags);
        res.status(200).send(data);
    } catch (e) {
        handleError(res);
    }
}

async function atualizar(req, res, next) {

    try {
        let body = {
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
        };

        if (req.body.image) {
            const data = await repository.selecionarPorId(req.params.id);
            const filename = data.image.substring(55);
            await uploadImage(req.body.image, 'product-images', 'jpg', filename);

            body.image = 'https://guilherme.blob.core.windows.net/product-images/' + filename  
        }

        await repository.atualizar(req.params.id, body);
        res.status(200).send({
            message: "OK"
        });
    } catch (e) {
        handleError(res);
    }
};

async function atualizarPorSlug(req, res, next) {
    try {
        await repository.atualizarPorSlug(req.params.slug, req.body);
        res.status(200).send({
            message: "OK"
        });
    } catch (e) {
        handleError(res);
    }
};

async function removerPorId(req, res, next) {
    try {
        await repository.remover(req.params.id);
        res.status(200).send({
            message: 'OK'
        });
    } catch (e) {
        handleError(res);
    }
};

async function removerPorSlug(req, res, next) {
    try {
        await repository.removerPorSlug(req.params.id);
        res.status(200).send({
            message: 'OK'
        });
    } catch (e) {
        handleError(res);
    }
}