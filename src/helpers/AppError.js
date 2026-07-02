class AppError extends Error {
    constructor(mensaje, statusCode) {
        super(mensaje);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

export default AppError;
