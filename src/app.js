'use strict';

const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express(); // Instancia o express em app;
const router = express.Router(); // Rotas 

// Conecta ao banco
mongoose.connect(config.connectionString) // Conexão com o banco através de connect string

// Carrega os models
const Product = require('./models/product');
const Costumer = require('./models/costumer');
const Order = require('./models/order');

// Carregar as rotas
const indexRoutes = require('./routes/index-route');
const productRoutes = require('./routes/product-route');
const costumerRoutes = require('./routes/costumer-routes');
const orderRoutes = require('./routes/order-routes');
const loginRoutes = require('./routes/login-routes');

app.use(bodyParser.json()); // Converte todo os body das req para json "middleware"
app.use(bodyParser.urlencoded({ extended: false })); // Faz urlencoded nas rotas

app.use('/', indexRoutes); // Adiciona um prefixo que deve ser colocado antes da rota ex: se o prefixo for /user a rota devera ser {{HOST}}:port/user/rota
app.use('/products', productRoutes);
app.use('/costumers', costumerRoutes);
app.use('/orders', orderRoutes);
app.use('/login', loginRoutes);

module.exports = app;