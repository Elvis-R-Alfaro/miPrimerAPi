const passport = require('passport');
const Usuario = require('../models/modeloUsuario');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const expiracion = moment.duration(50, 'minutes').asSeconds();
const ClaveToken = 'MyClaveSegura';

exports.getToken = (data) => {
    return JWT.sign(data, ClaveToken, {expiresIn: expiracion});
};
const opciones = {
    jwtFromRequest: extraerJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: ClaveToken,
};
passport.use(new estrategiaJWT(opciones, async (payload, done) => {
    return await Usuario.findOne({
        where: {
            id: payload.id,
            habilitado: true,
            estado: 'AC', 
        }
    })
    .then((data)=>{
        return done(null, data.id);
    })
    .catch((error)=>{
        console.log(error);
        return done(null, false);
    });
}));

exports.ValidarAutenticacion = passport.authenticate('jwt', {session: false, failureRedirect: '/api/autentucacion/error'});