const { validationResult } = require('express-validator');
const Usuario = require('../models/modeloUsuario');
const modeloUsuario = require('../models/modeloUsuario');

exports.Listar = async (req, res) => {
    try {
        const Lista = await modeloUsuario.findAll();
        console.log(Lista);
        res.json(Lista);
    } catch (error) {
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
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    }
    else {
        const { login,empleado,contrasena,accesototal,habilitado,pin,fallidos,correo,estado } = req.body;
        const buscarLogin = Usuario.findOne({
            where: {
                login: login
            }
        });
        const buscarCorreo = Usuario.findOne({
            where: {
                correo: correo
            }
        });
        if (buscarLogin) {
            msj.mensaje = 'El login ya existe';
        }
        else if(buscarCorreo){
            msj.mensaje = 'El correo ya existe';
        }
        else{

            try {   
                await modeloUsuario.create(
                    {
                        login:login,
                        empleado:empleado,
                        contrasena:contrasena,
                        accesototal:accesototal,
                        habilitado:habilitado,
                        pin:pin,
                        fallidos:fallidos,
                        correo:correo,
                        estado:estado
                    });
                msj.mensaje = 'Registro almacenado';
    
            } catch (error) {
                msj.mensaje = error;
                console.log(error)
            }
        }


    }
    res.json(msj);
};

exports.Editar = async(req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    } else {
        const { id } = req.query;
        const { login, empleado_id, contraseña, accesototal, habilitacion, pin, fallido, correo, estado } = req.body;

        try {
            var buscarUsuario = await modeloUsuario.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarUsuario) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{
                buscarUsuario.login= login;
                buscarUsuario.empleado = empleado_id ;
                buscarUsuario.contraseña = contraseña ;
                buscarUsuario.accesototal = accesototal ;
                buscarUsuario.habilitacion = habilitacion ;
                buscarUsuario.pin = pin;
                buscarUsuario.fallido = fallido;
                buscarUsuario.correo = correo;
                buscarUsuario.estado = estado;
                await buscarUsuario.save(); 
                msj.mensaje = 'Registros actualizado';
            }
        } catch (error) {
            msj.mensaje = 'Error al editar los datos';

        }
    }
    res.json(msj);
};

exports.Eliminar = async(req, res)=> {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            msj.mensaje += element.msg + '. ';
        });

    } else {
        const { id } = req.query;
        try {
            var buscarUsuario = await modeloUsuario.findOne({
                where:{
                    id:id
                }
            });
           
            if (!buscarUsuario) {
                msj.mensaje = 'El id del registro no existe'
                
            }else{                
                await modeloUsuario.destroy({
                    where: 
                    {
                        id:id
                    }
                });
                msj.mensaje = 'Registros  Eliminado';
            }
        } catch (error) {
            msj.mensaje = 'Error al eliminar los datos';

        }
    }
    res.json(msj);
 };
