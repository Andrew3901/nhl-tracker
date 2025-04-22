import HealthController from '../controllers/healthcontroller.js';
function setRoutes(app) {
    const healthController = new HealthController();
    app.get('/live', healthController.livecheck);
}




// Export the router
export default setRoutes;