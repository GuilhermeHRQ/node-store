'use strict';

module.exports = {
    autenticar,
    autenticarPorId,
    autenticarPorEmail,
    redefinirSenha
}

const mongoose = require('mongoose');
const Costumer = mongoose.model('Costumer');

/**
 * Faz a busca do usuário no banco procurando pelo email e senha passados
 * @param {Object} data Objeto que deve conter o email e senha(md5) do usuário a ser autenticado
 */
async function autenticar(data) {
    const res = await Costumer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

/**
 * Autentica o usuário pelo id, obtido através de um outro token
 * @param {String} id do usuário logado
 */
async function autenticarPorId(id) {
    const res = await Costumer.findById(id);
    return res;
}

/**
 * Autentica o usuário pelo email
 * @param {String} email do usuário logado
 */
async function autenticarPorEmail(email) {
    const res = await Costumer.findOne({ email: email });
    return res;
}


/**
 * Redefine a senha do usuário
 * @param {String} id do usuário
 * @param {String} novaSenha a ser atualziada
 */
async function redefinirSenha(id, novaSenha) {
    await Costumer.findByIdAndUpdate(id, {
        $set: {
            password: novaSenha
        }
    });
}
