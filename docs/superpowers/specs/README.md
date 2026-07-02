# API REST Node.js + MongoDB + JWT

API REST construida con Express, MongoDB y autenticación JWT. Operaciones CRUD para gestionar personas, con protección de rutas y manejo centralizado de errores.

## Requisitos

- Node.js >= 18
- MongoDB instalado y corriendo localmente (puerto 27017)

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/primeraApi
JWT_SECRET=tu_clave_secreta_aqui
```

## Uso

### Iniciar servidor

```bash
npm run dev
```

### Poblar base de datos con datos de ejemplo

```bash
npm run seed
```

## Endpoints

### Autenticación (públicos)

#### POST /api/auth/register
Registrar un nuevo usuario.

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Admin","email":"admin@test.com","password":"123456"}'
```

#### POST /api/auth/login
Iniciar sesión y obtener token JWT.

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'
```

### Personas (requieren autenticación)

Todas las rutas de personas requieren el header `Authorization: Bearer <token>`.

#### GET /api/personas
Listar todas las personas.

```bash
curl http://localhost:3000/api/personas \
  -H "Authorization: Bearer TOKEN_AQUI"
```

#### GET /api/personas/:id
Obtener una persona por ID.

```bash
curl http://localhost:3000/api/personas/ID_AQUI \
  -H "Authorization: Bearer TOKEN_AQUI"
```

#### POST /api/personas
Crear una nueva persona.

```bash
curl -X POST http://localhost:3000/api/personas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -d '{"nombre":"Carlos","email":"carlos@test.com","edad":28}'
```

#### PUT /api/personas/:id
Actualizar una persona existente.

```bash
curl -X PUT http://localhost:3000/api/personas/ID_AQUI \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -d '{"nombre":"Carlos Updated","edad":29}'
```

#### DELETE /api/personas/:id
Eliminar una persona.

```bash
curl -X DELETE http://localhost:3000/api/personas/ID_AQUI \
  -H "Authorization: Bearer TOKEN_AQUI"
```

## Estructura del proyecto

```
src/
├── index.js                # Punto de entrada
├── config/
│   └── db.js               # Conexión a MongoDB
├── models/
│   ├── User.js             # Modelo de usuario
│   └── Persona.js          # Modelo de persona
├── controllers/
│   ├── authController.js   # Lógica de autenticación
│   └── personaController.js # CRUD de personas
├── routes/
│   ├── authRoutes.js       # Rutas de autenticación
│   └── personaRoutes.js    # Rutas de personas (protegidas)
├── middleware/
│   ├── authMiddleware.js   # Verificación de token JWT
│   └── errorHandler.js     # Manejo centralizado de errores
├── helpers/
│   └── AppError.js         # Clase de error personalizada
└── seed.js                 # Poblar DB con datos de ejemplo
```
