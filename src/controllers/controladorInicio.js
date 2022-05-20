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
exports.Otra = (req, res) => {
    res.send("Otra ruta");
};