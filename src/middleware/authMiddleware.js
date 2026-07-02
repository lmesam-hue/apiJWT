import jwt from 'jsonwebtoken';
import AppError from '../helpers/AppError.js';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError('Token no proporcionado', 401));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await User.findById(decoded.id).select('-password');

        if (!usuario) {
            return next(new AppError('Usuario no encontrado', 401));
        }

        req.user = usuario;
        next();
    } catch (error) {
        return next(new AppError('Token inválido o expirado', 401));
    }
};

export default verifyToken;
