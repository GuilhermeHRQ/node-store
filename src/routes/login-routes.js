'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/login-controller');
const auth = require('../services/auth-service');

router.post('/', controller.logar);
router.post('/refazer', auth.authorize, controller.refazLogin);
router.post('/esqueci-senha', controller.gerarTokenSenha);
router.post('/redefinir-senha', auth.authorize, controller.redefinirSenha);
router.post('/redefinir-senha/:token', controller.redefinirSenha);

module.exports = router;
