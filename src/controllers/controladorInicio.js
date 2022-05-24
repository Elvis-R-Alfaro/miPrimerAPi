exports.Inicio = (req, res) => {
    const listaModulos = [
        {modulo: "empleados", ruta: "/api/empleados"},
        {modulo: "clientes", ruta: "/api/clientes"},
    ];
    const msj = {
        api: "API-SIGRES",
        description: "Interfaces de programacion para el sistema de gestion de restaurantes",
        propietario: "DESOFIW",
        desarrollador: "Elvis Alfaro",
        colaboratores: "Ing Carlos Flores",
        listaModulos,
    };
    res.json(msj);
};
exports.ejemploPost = (req, res) => {
    //console.log(req.body);
    const { usuario, contraseña } = req.body;
    console.log(usuario);
    console.log(contraseña);
    const msj = { 
        mensaje: 'Ninguno'
    };
    if(!usuario || !contraseña) {
        msj.mensaje = 'Debe de enviar los datos completos';
    }
    else{
        msj.mensaje = 'Peticion procesada correctamente';
    }
    res.json(msj);
};