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
};
exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = { 
        mensaje: ''
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });
    }
    else{
        const { nombre, descripcion } = req.body;
        try {
            await modeloCargo.create({
                nombre: nombre,
                descripcion: descripcion,
            });
            msj.mensaje='Registro almacenado';
        } 
        catch (error) {
            msj.mensaje='Error al guardar los datos';
        }
            
    }
    res.json(msj);    
};
    
exports.ejemploPut = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    //console.log(req);
    const { id } = req.query.id;
    console.log(id);
    //const { usuario, contraseña } = req.body;
    const usuario2 = req.body.usuario;
    const contraseña2 = req.body.contraseña;
    console.log(usuario2);
    console.log(contraseña2);
    const msj = { 
        mensaje: 'Ninguno'
    };
    if(!usuario2 || !contraseña2) {
        msj.mensaje = 'Debe de enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion procesada correctamente';
    }
    res.json(msj);
};

exports.ejemploDelete = (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    //console.log(req);
    const { id } = req.query.id;
    console.log(id);
    //const { usuario, contraseña } = req.body;
    const msj = { 
        mensaje: 'Ninguno'
    };
    if(!id) {
        msj.mensaje = 'Debe de enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion procesada correctamente';
    }
    res.json(msj);
};