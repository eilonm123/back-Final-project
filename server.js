const express = require('express');

const app = express();
app.use(express.json())

const {loadRoutes} = require('./routes');
//loadRoutes(app)

app.listen(3000, () => {
	console.log('app is runing and listening on port 3000');
})
