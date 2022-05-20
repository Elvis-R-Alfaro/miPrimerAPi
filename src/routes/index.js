const { Router } = require('express');
const rutas = Router();
rutas.get('/', (req, res) => {
    const msj = {
        clase: "movil II",
        docente: "Ing. Carlos Flores"
    };
    res.json(msj);
});
rutas.get('/otra', (req, res) => {
    
    res.send("Otra ruta");
});
module.exports = rutas;