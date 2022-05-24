const { Router } = require('express');
const controladorInicio = require('../controllers/controladorInicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);
rutas.post('/post/', controladorInicio.ejemploPost)
module.exports = rutas;