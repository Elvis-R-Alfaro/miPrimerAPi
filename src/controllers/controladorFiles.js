const fs = require('fs');
const path = require('path');
const Empleados = require('../models/modeloEmpleado');
const MSJ = require('../components/mensajes');

exports.Recibir = async (req, res) => {
    //console.log(req);
    const { filename } = req.file;
    const { id } = req.body;
    try {
        
        var buscarEmpleado = await Empleados.findOne({
            where: {
                id: id
            }
        });

        if (!buscarEmpleado) {
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/employees/' + filename ));
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/employees/' + filename ));
                console.log('Imagen eliminada');
            }
            res.send('El id del registro no existe');
        }
        else{
            const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img/employees/' + buscarEmpleado.imagen ));
            if(buscarImagen){
                fs.unlinkSync(path.join(__dirname, '../public/img/employees/' + buscarEmpleado.imagen ));
                console.log('Imagen eliminada');
            }

            buscarEmpleado.imagen = filename;
            await buscarEmpleado.save()
            .then((data)=>{
                res.json(data);
            })
            .catch((error)=>{
                res.json(error);
            });
        }
    } 
    catch (error) {
        res.json(error);
    }
};