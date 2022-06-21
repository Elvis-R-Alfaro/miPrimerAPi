const nodemailer = require('nodemailer');

exports.RecuperarContraseña = async (data) => {
    const configurarCorreo = {
        from: process.env.APP_CORREO,
        to: data.correo,
        subject: 'Recuperar contraseña SIGRES',
        text: 'Pin temporal: ' + data.pin,
    };
    const transporte = nodemailer.createTransport({
        host: process.env.CORREO_HOST,
        port: process.env.CORREO_PORT,
        secure: false,
        auth: {
          user: process.env.APP_CORREO,
          pass: process.env.CORREO_CONTRASENA,
        }
      });
    /* const transporte = nodemailer.createTransport({
        host: 'servidor del correo',
        port: 'puerto del servidor',
        secure: true,
        auth: {
            user: 'usuario del correo',
            pass: 'contraseña del correo',
        }
    }); */
    transporte.verify(async function(error, success) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('El servidor puede enviar correos');
        }
    });
    return await transporte.sendMail(configurarCorreo);
};