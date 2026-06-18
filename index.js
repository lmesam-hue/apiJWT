import express from 'express';
import datos from './database.json' with { type: 'json' };

const app = express();

// Middleware para recibir JSON
app.use(express.json());

// GET - Consultar todas las personas
app.get('/personas', (req, res) => {
    res.json(datos);
});

// GET - Consultar una persona por ID
app.get('/personas/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const persona = datos.find(p => p.id === id);

    if (!persona) {
        return res.status(404).json({
            mensaje: 'Persona no encontrada'
        });
    }

    res.json(persona);
});

// POST - Agregar una nueva persona
app.post('/personas', (req, res) => {

    const nuevaPersona = req.body;

    datos.push(nuevaPersona);

    res.status(201).json({
        mensaje: 'Persona agregada correctamente',
        persona: nuevaPersona
    });

});

// PUT - Actualizar una persona por ID
app.put('/personas/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const persona = datos.find(p => p.id === id);

    if (!persona) {
        return res.status(404).json({
            mensaje: 'Persona no encontrada'
        });
    }

    persona.nombre = req.body.nombre;
    persona.edad = req.body.edad;

    res.json({
        mensaje: 'Persona actualizada correctamente',
        persona
    });

});

// DELETE - Eliminar una persona por ID
app.delete('/personas/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const indice = datos.findIndex(p => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Persona no encontrada'
        });
    }

    const eliminado = datos.splice(indice, 1);

    res.json({
        mensaje: 'Persona eliminada correctamente',
        persona: eliminado[0]
    });

});

app.listen(3000, () => {
    console.log('El servidor está corriendo en el puerto 3000');
});