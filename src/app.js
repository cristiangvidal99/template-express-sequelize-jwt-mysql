const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
