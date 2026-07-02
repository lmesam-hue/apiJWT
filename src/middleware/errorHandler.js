const errorHandler = (err, req, res, next) => {
    let codigo = err.statusCode || 500;
    let mensaje = err.message || 'Error interno del servidor';

    if (err.name === 'ValidationError' || err.name === 'CastError') {
        codigo = 400;
    }

    if (err.code === 11000) {
        codigo = 400;
        mensaje = 'El valor ya existe';
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        codigo = 401;
        mensaje = 'Token inválido o expirado';
    }

    res.status(codigo).json({
        status: err.status || 'error',
        codigo,
        mensaje
    });
};

export default errorHandler;
