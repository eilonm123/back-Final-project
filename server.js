const express = require('express');

const app = express();
app.use(express.json());
const {loadRoutes} = require('./routes');
//loadRoutes(app);
app.listen(3000,()=>console.log('app is running '));

