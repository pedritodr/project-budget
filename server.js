const app = require('./app');
const sequelize = require('./config/database');
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = 3000;

// Configuración de Handlebars
defineHandlebars(app);

function defineHandlebars(app) {
    app.engine('handlebars', exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
    }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, 'views'));
}

// Función para mostrar las rutas registradas
function logRoutes(app) {
    console.log('Rutas disponibles:');
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Rutas simples
            const method = Object.keys(middleware.route.methods)[0].toUpperCase();
            console.log(`${method} ${middleware.route.path}`);
        } else if (middleware.name === 'router') {
            // Rutas enrutadas
            middleware.handle.stack.forEach((nestedMiddleware) => {
                if (nestedMiddleware.route) {
                    const method = Object.keys(nestedMiddleware.route.methods)[0].toUpperCase();
                    console.log(`${method} ${nestedMiddleware.route.path}`);
                }
            });
        }
    });
}

sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');

    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);

        // Mostrar rutas disponibles
        logRoutes(app);
    });
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
