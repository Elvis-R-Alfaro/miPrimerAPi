const { Router } = require('express');
const controladorInicio = require('../controllers/controladorInicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);
rutas.get('/otra', controladorInicio.Otra);
module.exports = rutas;