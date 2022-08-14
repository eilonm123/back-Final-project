const {login} = require('../controllers/auth-controller')

module.exports = function loadAuthRoutes(app) {
	app.post('/api/register', register);
}