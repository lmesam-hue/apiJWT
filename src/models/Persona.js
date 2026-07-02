import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    edad: {
        type: Number,
        required: [true, 'La edad es obligatoria'],
        min: [0, 'La edad no puede ser negativa']
    }
}, {
    timestamps: true
});

export default mongoose.model('Persona', personaSchema);
