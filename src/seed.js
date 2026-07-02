import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Persona from './models/Persona.js';

dotenv.config();

const datos = [
    { nombre: "John Doe", email: "john.doe@example.com", edad: 25 },
    { nombre: "Jane Smith", email: "jane.smith@example.com", edad: 30 },
    { nombre: "Bob Johnson", email: "bob.johnson@example.com", edad: 22 },
    { nombre: "Alice Williams", email: "alice.williams@example.com", edad: 28 },
    { nombre: "Charlie Brown", email: "charlie.brown@example.com", edad: 35 },
    { nombre: "Diana Miller", email: "diana.miller@example.com", edad: 27 },
    { nombre: "Ethan Davis", email: "ethan.davis@example.com", edad: 33 },
    { nombre: "Fiona Garcia", email: "fiona.garcia@example.com", edad: 29 },
    { nombre: "George Wilson", email: "george.wilson@example.com", edad: 31 },
    { nombre: "Hannah Martinez", email: "hannah.martinez@example.com", edad: 26 }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');

        await Persona.deleteMany();
        console.log('Datos anteriores eliminados');

        const personas = await Persona.insertMany(datos);
        console.log(`${personas.length} personas insertadas`);

        await mongoose.connection.close();
        console.log('Seed completado');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

seed();
