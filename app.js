const express = require('express');
const companiesRouter = require('./routes/companiesRouter.js');
const mailRouter = require('./routes/mailRouter.js');

const app = express();
app.use(express.json());

app.use('/companies', companiesRouter);
app.use('/sendMail', mailRouter);

module.exports = app;
