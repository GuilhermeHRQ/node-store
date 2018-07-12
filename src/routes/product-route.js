'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const auth = require('../services/auth-service');

router.get('/', controller.selecionar);
router.get('/:slug', controller.selecionarPorSlug);
router.get('/admin/:id', auth.authorize, controller.selecionarPorId); // auth.autorize funciona como um middlewere que verifica se o token esta vindo na req
router.get('/tags/:tags', controller.selecionarPorTags);
router.post('/', controller.inserir);
router.put('/:slug', controller.atualizarPorSlug);
router.put('/admin/:id', auth.authorize, controller.atualizar);
router.delete('/:id', auth.authorize, controller.removerPorId);
router.delete('/remover/:slug', auth.authorize, controller.removerPorSlug);

module.exports = router;