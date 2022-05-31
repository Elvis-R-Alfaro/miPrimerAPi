const { validationResult } = require('express-validator');
const modeloCargo = require('../models/modeloCargo');
exports.Listar = async (req, res) => { //async es para que espere a que se ejecute la funcion y le devuelta un resultado
    try {
        const lista = await modeloCargo.findAll();
        console.log(lista);
        res.json(lista);
    }
    catch(error){
        console.error(error);
        res.json(error);
    }
    //res.json(msj);
};