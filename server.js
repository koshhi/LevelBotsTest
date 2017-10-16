// CONFIGURACIÓN BASE
const mongoose = require('mongoose')
const app = require ('./app')
const config = require('./config') // Configuración base de datos

//CONEXIÓN CON EL SERVIDOR
mongoose.connect(config.db, (err, res) =>{
	if(err) {
		return console.log(`Error al conectar a la DB: ${err}`)
	}
	console.log('Conexión a la DB establecida')

	app.listen(config.port, () =>{
		console.log('Listening on port ' + config.port)
	})
})
