import Persona from '../models/Persona.js';
import AppError from '../helpers/AppError.js';

export const getAll = async (req, res) => {
    const personas = await Persona.find();
    res.json(personas);
};

export const getById = async (req, res) => {
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
        throw new AppError('Persona no encontrada', 404);
    }
    res.json(persona);
};

export const create = async (req, res) => {
    const persona = await Persona.create(req.body);
    res.status(201).json({
        mensaje: 'Persona agregada correctamente',
        persona
    });
};

export const update = async (req, res) => {
    const persona = await Persona.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!persona) {
        throw new AppError('Persona no encontrada', 404);
    }
    res.json({
        mensaje: 'Persona actualizada correctamente',
        persona
    });
};

export const remove = async (req, res) => {
    const persona = await Persona.findByIdAndDelete(req.params.id);
    if (!persona) {
        throw new AppError('Persona no encontrada', 404);
    }
    res.json({
        mensaje: 'Persona eliminada correctamente',
        persona
    });
};
