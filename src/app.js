const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
app.set('port',3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/',require('./routes'));
app.use('/api/img',express.static(path.join(__dirname,'public/img')));
app.use('/api/cargos',require('./routes/rutasCargos'));
app.use('/api/usuarios',require('./routes/rutasUsuarios'));
app.use('/api/empleados',require('./routes/rutasEmpleados'));
app.use('/api/archivos',require('./routes/rutas.Files'));
app.listen(app.get('port'), () => {
    console.log("Servidor iniiado en el puerto " + app.get('port'));
});