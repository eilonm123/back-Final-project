module.exports = function loadRoutes (app) {
	require('./auth')(app);
}
