const { Router } = require('express');
const { body,query } = require('express-validator');
const controladorAutenticacion = require('../controllers/controladorAutenticacion');
const rutas = Router();

rutas.post('/recuperar',
body ('correo')
.notEmpty().withMessage('No se aceptan valores vacios para el correo del usuario')
.isEmail().withMessage('El correo debe ser valido'),
controladorAutenticacion.RecuperarContraseña);

rutas.post('/iniciarsesion',
body ('usuario')
.notEmpty().withMessage('No se aceptan valores vacios para el usuario'),
controladorAutenticacion.IniciarSesion);

module.exports = rutas;