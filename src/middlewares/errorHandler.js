const createError = require('http-errors');

function notFoundHandler(req, res, next) {
  next(createError(404));
}

function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let status = err.status || 500;
  let message = err.message;

  if (err.name === 'SequelizeValidationError') {
    status = 400;
    message = err.errors.map((item) => item.message).join(', ');
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    status = 409;
    message = 'El registro ya existe';
  }

  const wantsJson =
    req.path.startsWith('/auth') ||
    req.path.startsWith('/users') ||
    req.accepts('json') === 'json';

  if (wantsJson) {
    return res.status(status).json({
      error: {
        message,
        status,
      },
    });
  }

  res.status(status);
  res.render('error');
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
