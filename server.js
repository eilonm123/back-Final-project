const express = require('express');
const {loadRoutes} = require('./routes');
//loadRoutes(app);

app.listen(3000, () => {
	console.log('app is runing and listening on port 3000');
})

