// BASE SETUP /////////////////
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Company= require('./app/models/company')
const Product= require('./app/models/product')
const configDB = require('./config/database.js')

//configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

//ROUTES FOR OUT API ///////////////

var router = express.Router()

router.get('/companies', (req, res) => {
//Devuelve lista con los nombres de cada empresa junto a con el link de su web y su id.
//FUNCIONA

	Company.find({},"name homepage_url _id", (err, companies) =>{
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!companies) return res.status(404).send({message:'No existen compañias'})	
		
		res.status(200).send({companies})
	})
})

router.get('/company/:id', (req, res) => {
//El objeto de la empresa completo
//FUNCIONA

	let id = req.params.id

	Company.findById(id, (err, company) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!company) return res.status(404).send({message:'La compañía no existe'})

		// console.log({ company })
		res.status(200).send({ company: company })
	})
})

router.get('/company/:id/products', (req, res) => {
//Lista con los nombres de los productos
//FUNCIONA

	let id = req.params.id

	Company.findById(id, "products", (err, companyProducts) => {
		console.log(companyProducts)
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!companyProducts) return res.status(404).send({message:'La compañía no tiene productos'})
		
		res.status(200).send({ companyProducts: companyProducts})
		
	})
})

router.get('/company/:id/members', (req, res) => {
//Lista con los nombres y títulos de los miembros actuales de la compañía
//FUNCIONA

	let id = req.params.id

	Company.findById(id, "relationships", (err, companyMembers) =>{
		console.log(companyMembers)
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!companyMembers) return res.status(404).send({message:'La compañía no tiene miembros'})

		res.status(200).send({ companyMembers: companyMembers})
	})

})

router.post('/company', (req, res) => {
//Añade una nueva compañía a la empresa. La empresa debe tener como mínimo id, lista de productos y listas de miembros
//FUNCIONA

	let company = new Company ()
	company.name = req.body.name
	company.products = req.body.products
	company.relationships = req.body.relationships

	company.save((err, companyStored) => {
		if (err){
			return res.status(500).send({message: `Error al salvar en la DB: ${err} `})	
		} 
		
		res.status(300).send({company: companyStored})
	})
})

router.post('/company/:id/producto', (req, res) => {
//Añade un nuevo producto a una empresa
	let id = req.params.id

	let product = new Product ()
	product.name = req.body.name
	console.log(product)

	Company.findById(id, "products",(err, companyProducts)=>{
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!companyProducts) return res.status(404).send({message:'La compañía no tiene productos'})
		
		product.save((err, productStored) =>{
			if (err) res.status(500).send({message: `Error al salvar en la DB: ${err} `})
		
			res.status(300).send({product: productStored})
		})
	})
})

// router.post('/company/:id/producto', (req, res) => {
// //Añade un nuevo producto a una empresa
// 	let id = req.params.id

// 	let product = new Product ()
// 	product.name = req.body.name
// 	console.log(product)

// 	Company.findById(id, "products",(err, companyProducts)=>{
// 		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
// 		if (!companyProducts) return res.status(404).send({message:'La compañía no tiene productos'})
		
// 		product.save((err, productStored) =>{
// 			if (err) res.status(500).send({message: `Error al salvar en la DB: ${err} `})
		
// 			res.status(300).send({product: productStored})
// 		})
// 	})
// })


router.put('/company/:id', (req, res) => {
//Actualiza los datos de una empresa
//FUNCIONA
	let id = req.params.id
	let update = req.body

	Company.findByIdAndUpdate(id, update, (err, companyUpdated) =>{
		if (err) res.status(500).send({message: `Error al actualizar la empresa: ${err}`})

		res.status(200).send({ company: companyUpdated })
	})

})

router.delete('/company/:id', (req, res) => {
//Borra los datos de una empresa
//FUNCIONA
	let id = req.params.id

	Company.findById(id, (err, company) => {
		if (err) res.status(500).send({message: `Error al borrar la empresa: ${err}`})

		company.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar la empresa: ${err}`})

			res.status(200).send({message: 'La empresa ha sido borrada'})
		})

	})
})

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router)



//SERVER /////////////////
mongoose.connect(configDB.url , (err, res) =>{
	if(err) {
		return console.log(`Error al conectar a la DB: ${err}`)
	}
	console.log('Conexión a la DB establecida')

	app.listen(port, () =>{
		console.log('Listening on port ' + port)
	})
})
