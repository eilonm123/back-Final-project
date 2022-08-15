const {login, register} = require('../controllers/auth-controller.js')

module.exports = function loadAuthRoutes(app) {
	app.post('/api/register', register);
	app.post('/api/login', login)
}