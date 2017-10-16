const Company= require('../models/company')

function getCompanies (req, res){
	Company.find({},"name homepage_url _id", (err, companies) =>{
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!companies) return res.status(404).send({message:'No existen compañias'})	
		
		res.status(200).send({companies})
	})
}

function getCompany (req, res){
	let id = req.params.id

	Company.findById(id, (err, company) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!company) return res.status(404).send({message:'La compañía no existe'})

		res.status(200).send({ company: company })
	})
}

function getCompanyProducts (req, res){
	let id = req.params.id

	Company.findById(id, "products", (err, companyProducts) => {
		console.log(companyProducts)
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})	
		if (!companyProducts) return res.status(404).send({message:'La compañía no tiene productos'})
		
		res.status(200).send({ companyProducts: companyProducts})	
	})
}

function getCompanyMembers (req, res){
	let id = req.params.id

	Company.findById(id, "relationships", (err, companyMembers) =>{
		console.log(companyMembers)
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!companyMembers) return res.status(404).send({message:'La compañía no tiene miembros'})

		res.status(200).send({ companyMembers: companyMembers})
	})
}

function saveCompany (req, res){
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
}

function saveCompanyProduct (req, res) {
	let id = req.params.id
	productName = req.body.name

	Company.findById(id, "products",(err, companyProducts)=>{
		
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})

		if (!companyProducts) return res.status(404).send({message:'La compañía no tiene productos'})

		if (companyProducts){

			let newProduct = { name: productName }

			var productFound = companyProducts.products.some(found => found["name"] == productName)

			if(productFound) return res.status(404).send({message:'El producto está repetido'})

			if (!productFound){
				Company.update({ _id: id },{$push: {products: newProduct}}, {upsert:true}, (err)=>{
					if(err) return res.json({success: false, message: err})
					
					res.json({companyProducts: newProduct})
				})
			}
		}
	})
}

function updateCompany (req, res) {
	let id = req.params.id
	let update = req.body

	Company.findByIdAndUpdate(id, update, (err, companyUpdated) =>{
		if (err) res.status(500).send({message: `Error al actualizar la empresa: ${err}`})

		res.status(200).send({ company: companyUpdated })
	})
}

function deleteCompany (req, res) {
	let id = req.params.id

	Company.findById(id, (err, company) => {
		if (err) res.status(500).send({message: `Error al borrar la empresa: ${err}`})

		company.remove(err => {
			if (err) res.status(500).send({message: `Error al borrar la empresa: ${err}`})

			res.status(200).send({message: 'La empresa ha sido borrada'})
		})

	})
}

module.exports = {
	getCompanies,
	getCompany,
	getCompanyProducts,
	getCompanyMembers,
	saveCompany,
	saveCompanyProduct,
	updateCompany,
	deleteCompany
}