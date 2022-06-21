const {ValidationResult, validationResult} = require('express-validator');
const MSJ = require('../components/mensajes');
const Usuario = require('../models/ModeloUsuario');
const EnviarCorreo = require('../configurations/correo')
const gpc = require('generate-pincode');
const { Op } = require('sequelize');

function validar (req, res, next){
    const validaciones = validationResult(req); 
    var errores = [];
    var error = {
        mensaje:'',
        parametro:'',
    };
    var msj = {
        estado: 'correcto',
        mensaje: 'Peticion ejecutada correctamente',
        datos: '',
        errores: '',
    };
    if(validaciones.errors.length > 0){
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg;
            error.parametro = element.param;
            errores.push(error);
        });
        msj.estado = 'error';
        msj.mensaje = 'Peticion ejecutada con errores';
        msj.errores = errores;
    }  
    return msj;
};

exports.RecuperarContraseña = async (req, res,) => {
    const msj = validar(req);

    if(msj.errores.length > 0){
        MSJ(res, 200, msj);    
    }
    else{
        try {
            const { correo } = req.body;
            var buscarUsuario = await Usuario.findOne({
                where:{
                    correo
                }
            });
            if(!buscarUsuario){
                msj.estado = 'error';
                msj.mensaje = 'La peticion no se pudo ejecutar';
                msj.errores = {
                    mensaje: 'El correo no existe o no se encuentra registrado',
                    parametro: 'correo',
                };
            } 
            else{
                try {
                    const pin = gpc(4);
                    buscarUsuario.pin = pin;
                    console.log(pin);
                    await buscarUsuario.save();
                    const data = {
                        pin,
                        correo
                    };
                    EnviarCorreo.RecuperarContraseña(data);
                    msj.estado = 'correcto',
                    msj.mensaje= 'Peticion ejecutada correctamente',
                    msj.datos= '',
                    msj.errores= '',
                    MSJ(res, 200, msj);                    
                } catch (error) {
                    msj.estado = 'error';
                    msj.mensaje = 'Error al enviar el correo';
                    msj.errores = error;
                    MSJ(res, 500, msj);
                }
            }           
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'Error al buscar el usuario';
            msj.errores = error;
            MSJ(res, 500, msj);
        }
    }
};

exports.IniciarSesion = async (req, res,) => {
    const msj = validar(req);

    if(msj.errores.length > 0){
        MSJ(res, 200, msj);    
    }
    else{
        try {
            const { usuario } = req.body;
            const { correo } = req.body;
            var buscarUsuario = await Usuario.findOne({
                where:{
                    [Op.and]:[
                        {[Op.or]: [
                            {usuario},
                            {correo}                   
                        ]},
                        {estado: 'AC'}                    
                    ]
                }
            });
            if(!buscarUsuario){
                msj.estado = 'error';
                msj.mensaje = 'La peticion no se pudo ejecutar';
                msj.errores = {
                    mensaje: 'El correo no existe o no se encuentra registrado',
                    parametro: 'correo',
                };
            } 
            else{
                try {
                    const pin = gpc(4);
                    buscarUsuario.pin = pin;
                    console.log(pin);
                    await buscarUsuario.save();
                    const data = {
                        pin,
                        correo
                    };
                    EnviarCorreo.RecuperarContraseña(data);
                    msj.estado = 'correcto',
                    msj.mensaje= 'Peticion ejecutada correctamente',
                    msj.datos= '',
                    msj.errores= '',
                    MSJ(res, 200, msj);                    
                } catch (error) {
                    msj.estado = 'error';
                    msj.mensaje = 'Error al enviar el correo';
                    msj.errores = error;
                    MSJ(res, 500, msj);
                }
            }           
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'Error al buscar el usuario';
            msj.errores = error;
            MSJ(res, 500, msj);
        }
    }
};