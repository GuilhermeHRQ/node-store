'use strict';

const uuid1 = require('uuid/v1');
const config = require('../config')
const azureStorage = require('azure-storage');

/**
 * Faz o upload de um arquivo em base64 na Azure Storage
 * @param {base64} file - Arquivo em base64
 * @param {String} container - Container onde vai ser salvo o arquivo
 * @param {Sring} imgExtension - Extensão do arquivo
 * @param {String} subscribeFile - Nome do arquivo a ser atualizado (Apenas atualização)
 * @return {String} - Retorna o nome do arquivo salvo
 */
async function uploadFile(file, container, imgExtension, subscribeFile = '') {
    // Cria um blobService a partir da strig de conecxão no config
    const blobSvc = azureStorage.createBlobService(config.containerConnectionString);
    
    let filename = subscribeFile || (uuid1() + '.' + imgExtension); // Cria um nome randomico para que uma imagem não sobrescreva outra
    const rawdata = file; // base64 da imagem que está vindo no request
    const matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/); // Separando o cabeçalho que vem no base64 da img
    const type = matches[1];
    const buffer = new Buffer(matches[2], 'base64');

    /**
     * Cria um blob a partir de um texto(base64)
     * @param {String} container - Container onde vai ser salvo o arquivo
     * @param {String} filename - Nome do arquivo que vai ser salvo
     * @param {Buffer} buffer - Buffer do arquivo
     * @param {Object} - Tipo de conteúdo
     * @param {Function} - Função de erro
     */
    await blobSvc.createBlockBlobFromText(container, filename, buffer, {
        contentType: type
    }, (error, result, response) => {
        if (error) {
            filename = 'default-image.png';
        }
    });

    return filename;
}

module.exports = uploadFile;
