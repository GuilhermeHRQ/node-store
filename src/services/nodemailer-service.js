'use strict';

module.exports = sendMail;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: 'guilherme_hrq99@outlook.com',
        pass: 'pass'
    },
    tls: {
        rejectUnauthorized: false
    }
});

let mailOptions = {
    from: 'guilherme_hrq99@outlook.com',
};

/**
 * Função que envia emails
 * @param {Object} mailOptionsExtended Objeto contendo o to, subject e text? do email
 */
function sendMail(mailOptionsExtended) {
    Object.assign(mailOptions, mailOptionsExtended);

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            }

            resolve(info);
        });
    });
}