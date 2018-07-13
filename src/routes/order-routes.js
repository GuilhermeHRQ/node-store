'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const auth = require('../services/auth-service');

router.post('/inserir', auth.authorize, controller.inserir);
router.get('/selecionar', auth.authorize, controller.selecionar);
router.get('/selecionar/:id', auth.isAdmin, controller.selecionarPorId);
router.put('/atualizar/:id', auth.isAdmin, controller.atualizar);
router.delete('/remover/:id', auth.isAdmin, controller.remover);

module.exports = router;