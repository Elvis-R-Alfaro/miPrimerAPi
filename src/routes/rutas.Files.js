const { Router } = require('express');
const path = require('path');
const multer = require('multer'); //Libreria para subir archivos o almacenar archivos
const storageEmployees = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/employees'));
    },
    filename: (req, file, cb) => {
        const nameFile = Date.now() + '-' + Math.round(Math.random() *1E9);
        cb(null, file.fieldname + '-' + nameFile + '-' + file.mimetype.replace('/', '.'));
    }
});
const uploadEmployees = multer({ storage: storageEmployees });
const controladorFiles = require('../controllers/controladorFiles');
const rutas = Router();
rutas.post('/empleados/img', uploadEmployees.single('img') ,controladorFiles.Recibir);


module.exports = rutas;