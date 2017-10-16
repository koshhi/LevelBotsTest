const express = require('express')
const companyCtrl = require('../controllers/company')

//RUTAS API 
const api = express.Router()

api.get('/companies', companyCtrl.getCompanies) //Devuelve lista con los nombres de cada empresa junto a con el link de su web y su id.
api.get('/company/:id', companyCtrl.getCompany) //Devuelve el objeto de la empresa completo.
api.get('/company/:id/products', companyCtrl.getCompanyProducts) //Devuelve la lista con los nombres de los productos
api.get('/company/:id/members', companyCtrl.getCompanyMembers) //Devuelve la lista con los nombres y títulos de los miembros actuales de la compañía
api.post('/company', companyCtrl.saveCompany) //Añade una nueva compañía a la empresa. La empresa debe tener como mínimo id, lista de productos y listas de miembros
api.post('/company/:id/producto', companyCtrl.saveCompanyProduct) //Añade un nuevo producto a una empresa
api.put('/company/:id', companyCtrl.updateCompany) //Actualiza los datos de una empresa
api.delete('/company/:id', companyCtrl.deleteCompany) //Borra los datos de una empresa

module.exports = api