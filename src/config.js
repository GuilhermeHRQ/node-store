global.SALT_KEY = 'fd8b3ca0-822d-11e8-9257-a799e4aa76a3'; // Chave privada de segurança
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>\nSeja bem vindo a Node Store!'; // Template de email

module.exports = {
    connectionString: 'mongodb://jamal:jamal123@ds018568.mlab.com:18568/ndstr',
    sandgridKey: 'SendKey',
    containerConnectionString: 'AzureKey'
}