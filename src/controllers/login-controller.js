'use strict';

module.exports = {
    logar,
    refazLogin,
    redefinirSenha,
    gerarTokenSenha
}

const md5 = require('md5');
const auth = require('../services/auth-service');
const repository = require('../repositories/login-repository');
const mailer = require('../services/nodemailer-service');

async function logar(req, res, next) {
    try {

        // Chama repositório para autenticar o email e senha passados
        const user = await repository.autenticar({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        // Caso o usuário seja válido é chamado o auth para gerar o token do mesmo, encriptando o id, email e nome do usuário nele
        if (user) {
            const token = await auth.generateToken({
                id: user._id,
                email: user.email,
                name: user.name
            });

            res.status(200).send({
                token: token,
                data: {
                    email: user.email,
                    name: user.name
                }
            });
        } else {
            res.status(404).send({
                message: 'Email ou senha incorretos'
            });
        }

    } catch (e) {
        res.status(500).json({
            message: 'Erro ao processar sua requisição'
        });
    }
}

async function refazLogin(req, res, next) {
    try {

        // pega os dados do user pelo token do mesmo
        const user = await auth.decodeToken(req.headers['authorization']);

        if (user) {
            const token = await auth.generateToken({
                id: user._id,
                email: user.email,
                name: user.name
            });

            res.status(200).send({
                token: token,
                data: {
                    email: user.email,
                    name: user.name
                }
            });
        } else {
            res.status(404).send({
                message: 'Cliente não encontrados'
            });
        }

    } catch (e) {
        res.status(500).json({
            message: 'Erro ao processar sua requisição'
        });
    }
}

async function redefinirSenha(req, res, next) {
    try {
        // Verifica se a novaSenha e a confirmação coincidem
        const senhasCoincidem = req.body.novaSenha === req.body.confirmaSenha;

        if (!senhasCoincidem) {
            res.status(401).json({
                message: 'Confirmação de senha não coincide'
            });
            return;
        }

        let user = null;

        if (req.params.token) {
            user = await auth.decodeToken(req.params.token);
        } else {
            // Busca o usuário pelo email e pela senha antiga
            user = await repository.autenticar({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });
        }

        if (!user) {
            res.status(404).json({
                message: 'Email ou senha incorretos'
            });
            return;
        }

        // Cria a nova senha em md5
        const novaSenha = md5(req.body.novaSenha + global.SALT_KEY);

        // Chama o repositorio para atualizar a senha
        await repository.redefinirSenha(user._id, novaSenha);

        res.status(200).json({
            message: 'Senha alterada com sucesso'
        });

    } catch (e) {
        res.status(500).json({
            message: 'Erro ao processar sua requisição'
        });
    }
}

async function gerarTokenSenha(req, res, next) {
    try {
        const user = await repository.autenticarPorEmail(req.body.email);

        if (!user) {
            res.status(404).json({
                message: 'Email não cadastrado'
            });
            return;
        }

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            name: user.name
        });

        const emailData = {
            to: user.email,
            subject: 'Redefinição de senha - Node Store',
            html: user.name + ', para redefinir sua senha acesse o link abaixo:\nhttp://localhost/login/redefinir/' + token
        }

        await mailer(emailData);

        res.status(200).json({
            message: 'Email enviado com sucesso'
        });
    } catch (e) {
        res.status(500).json({
            message: 'Erro ao processar sua requisição'
        });
    }
}