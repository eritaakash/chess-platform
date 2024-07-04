const path = require('path');
const fs = require('fs/promises');

const handleRoutes = async (app) => {
    const routesPath = path.join(__dirname, '../api/routes');
    const routesDir = await fs.readdir(routesPath);

    for (const file of routesDir) {
        const { route, router } = require(path.join(routesPath, file));
        app.use(route, router);
    }
};

const handleRoutesConnection = (app) => handleRoutes(app);
module.exports = handleRoutesConnection;