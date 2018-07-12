'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const auth = require('../services/auth-service');

router.post('/inserir', auth.authorize, controller.inserir);
router.get('/selecionar', auth.authorize, controller.selecionar);
router.get('/selecionar/:id', auth.authorize, controller.selecionarPorId);
router.put('/atualizar/:id', auth.authorize, controller.atualizar);
router.delete('/remover/:id', auth.authorize, controller.remover);

module.exports = router;