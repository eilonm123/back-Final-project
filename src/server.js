const express = require('express');
// const dotenv = require('dotenv')
// dotenv.config()

const app = express();
app.use(express.json())

const {loadRoutes} = require('./routes/index.js');
loadRoutes(app)

app.listen(3000, () => {
	console.log('listening on port 3000');
})
