const { verifyUser } = require('../middlewares/auth-middlewares');
const { getUser } = require('../controllers/users-controller')

module.exports = function loadUsersRoutes(app) {
	app.get('/api/user-info', verifyUser, getUser);
}