const express = require('express');
const ejsLayouts = require('express-ejs-layouts');

const homePageRouter = require('./routes/homePageRouter.js');
const receiversRouter = require('./routes/receiversRouter.js');
const lettersRouter = require('./routes/lettersRouter.js');
const disseminationRouter = require('./routes/disseminationRouter.js');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);

app.use('/', homePageRouter)
app.use('/receivers', receiversRouter);
app.use('/letters', lettersRouter);
app.use('/dissemination', disseminationRouter);

module.exports = app;
