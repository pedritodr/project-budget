const express = require('express');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const path = require('path');
const exphbs = require('express-handlebars');
const userRoutes = require('./routes/userRoutes');
const infoRoutes = require('./routes/infoRoutes');
const seccionesRoutes = require('./routes/seccionesRoutes')
const contactoRoutes = require('./routes/contactoRoutes')
const comentarioRoutes = require('./routes/comentarioRoutes')
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());

Handlebars.registerHelper('generateStars', function(calificacion) {
    let stars = '';
    for (let i = 0; i < calificacion; i++) {
        stars += '<i class="fa fa-star" aria-hidden="true"></i>';
    }
    return new Handlebars.SafeString(stars);
});

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Servir la página principal

app.get('/', async (req, res) => {

    try {
        const response = await fetch('http://localhost:3000/api/comentario');
        const data = await response.json();
        const comentarios = data.data;
        res.render('home', { 
            title: 'Inance - Home',
            comentarios: comentarios
        });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

// Ruta para la página About
app.get('/about', (req, res) => {
    res.render('about', { title: 'Inance - About' });
});

// Ruta para la página Services
app.get('/services', (req, res) => {
    res.render('services', { title: 'Inance - Services' });
});

// Ruta para la página Contact
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Inance - Contact' });
});


// Rutas API
app.use('/api', userRoutes);
app.use('/api', infoRoutes);
app.use('/api', seccionesRoutes);
app.use('/api', contactoRoutes);
app.use('/api', comentarioRoutes)


// Middleware para manejar errores
app.use(errorHandler);

module.exports = app;
