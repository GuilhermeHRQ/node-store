'use strict';

const config = require('../config');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(config.sandgridKey);

async function send(to, subject, body) {
    sendgrid.send({
        to: to,
        from: 'nodestore@gmail.com',
        subject: subject,
        html: body
    });
}

module.exports = send;