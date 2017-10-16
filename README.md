# LevelBotsTest
Technical test for LevelBots

CÉSAR ÁLVAREZ MARÍN
cesaralvarezmarin@gmail.com

RUTAS:
Emplear el prefijo /api/

get('/') //Devuelve el mensaje:'api-rest-levelbots-test'

get('/companies') //Devuelve lista con los nombres de cada empresa junto a con el link de su web y su id.

get('/company/:id') //Devuelve el objeto de la empresa completo.

get('/company/:id/products') //Devuelve la lista con los nombres de los productos

get('/company/:id/members') //Devuelve la lista con los nombres y títulos de los miembros actuales de la compañía

post('/company' //Añade una nueva compañía a la empresa. La empresa debe tener como mínimo id, lista de productos y listas de miembros. Requiere autentificarse previamente con /signup.

post('/company/:id/producto') //Añade un nuevo producto a una empresa. Requiere autentificarse previamente con /signup.

put('/company/:id') //Actualiza los datos de una empresa. Requiere autentificarse previamente con /signup.

delete('/company/:id') //Borra los datos de una empresa. Requiere autentificarse previamente con /signup.

post('/signUp')

post('/signIn')

get('/private') //Devuelve el mensaje: Tienes acceso. Confirmación del sistema de token

URL:
https://api-rest-levelbots-test.herokuapp.com/api/
