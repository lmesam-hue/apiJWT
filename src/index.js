import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import conectarDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import personaRoutes from './routes/personaRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Faltan variables de entorno requeridas: MONGO_URI y/o JWT_SECRET');
    process.exit(1);
}

conectarDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/personas', personaRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
