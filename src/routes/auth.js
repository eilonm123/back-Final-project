
const { login, register } = require('../controllers/auth.controller');

module.exports = function loadAuthRoutes(app) {
	app.post('/api/login', login);
	app.post('/api/register', register); 

}