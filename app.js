// CONFIGURACIÓN BASE EXPRESS
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const api = require('./routes/api-routes')

// Configuración app para usar bodyParser()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// REGISTRO DE RUTAS // Rutas prefijadas con /api
app.use('/api', api)

module.exports = app