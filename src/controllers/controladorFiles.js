const fs = require('fs');
const path = require('path');
const Empleados = require('../models/modeloEmpleado');

exports.Recibir = async (req, res) => {
    console.log(req);
    res.send('Archivo guardado');
};