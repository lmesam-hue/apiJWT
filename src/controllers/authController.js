import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../helpers/AppError.js';

const generarToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '5m' });
};

export const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        throw new AppError('Todos los campos son obligatorios', 400);
    }
    if (password.length < 6) {
        throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
    }

    const existe = await User.findOne({ email });
    if (existe) {
        throw new AppError('El email ya está registrado', 400);
    }

    const usuario = await User.create({ nombre, email, password });

    const token = generarToken(usuario._id, usuario.email);

    res.status(201).json({
        mensaje: 'Usuario registrado correctamente',
        token,
        user: {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
        throw new AppError('Credenciales inválidas', 401);
    }

    const passwordCorrecta = await usuario.compararPassword(password);
    if (!passwordCorrecta) {
        throw new AppError('Credenciales inválidas', 401);
    }

    const token = generarToken(usuario._id, usuario.email);

    res.json({
        mensaje: 'Inicio de sesión exitoso',
        token,
        user: {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }
    });
};
