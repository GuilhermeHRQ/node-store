'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        content: new Date().toISOString(),
        message: 'OK'
    });
});

module.exports = router;
