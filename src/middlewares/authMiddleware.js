const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Token de autenticacion requerido');
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'Token invalido o expirado';
    next(error);
  }
}

module.exports = authMiddleware;
