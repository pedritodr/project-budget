const Seccion = require('../models/secciones');

const seccionesData = async (req, res, next) => {
    try {
        const secciones = await Seccion.findAll();
        const data = secciones.reduce((acc, seccion) => {
            acc[seccion.seccion] = seccion.contenido;
            return acc;
        }, {});

        res.locals.secciones = data;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = seccionesData;