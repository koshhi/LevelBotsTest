const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema ({
            name: {
            	type: String,
            	required: 'El producto tiene que tener un nombre',
            	minlength:[1, "El campo nombre no puede estar vacío"]
            }
})


module.exports = mongoose.model('Product', ProductSchema)