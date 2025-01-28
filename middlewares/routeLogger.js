function routeLogger(app) {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') return next(); // Ignorar las solicitudes de preflight

        // Recorremos todas las rutas registradas
        const routes = [];
        app._router.stack.forEach((middleware) => {
            if (middleware.route) {
                // Rutas simples
                const method = Object.keys(middleware.route.methods)[0].toUpperCase();
                const path = middleware.route.path;
                routes.push({ method, path });
            } else if (middleware.name === 'router') {
                // Rutas enrutadas
                middleware.handle.stack.forEach((nestedMiddleware) => {
                    if (nestedMiddleware.route) {
                        const method = Object.keys(nestedMiddleware.route.methods)[0].toUpperCase();
                        const path = nestedMiddleware.route.path;
                        routes.push({ method, path });
                    }
                });
            }
        });

        console.log('Rutas disponibles:', routes);
        req.availableRoutes = routes; // Opcional: añadir rutas a la solicitud
        next();
    };
}

module.exports = routeLogger;
