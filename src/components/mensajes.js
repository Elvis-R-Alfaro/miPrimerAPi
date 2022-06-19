const msj = (res, estado, mensajess)=>{
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = estado;
    res.json(mensajess);
};

module.exports = msj;