const express = require('express');
const companiesRouter = require('./routes/companiesRouter.js');

const app = express();
app.use(express.json());

app.use('/companies', companiesRouter);

module.exports = app;
