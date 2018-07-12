'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/costumer-controller');

router.post('/inserir', controller.inserir);
router.get('/selecionar', controller.selecionar);
router.get('/selecionar/:id', controller.selecionarPorId);
router.put('/atualizar/:id', controller.atualizar);
router.delete('/remover/:id', controller.remover);

module.exports = router;