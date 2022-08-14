const { login, register } = require('../controllers/auth-controller');

module.exports = function loadAuthRoutes(app) {
	// POST /api/login
	app.post('/api/login', login);

	// POST /api/register
	app.post('/api/register', register);

}