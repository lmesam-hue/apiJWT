# Temas de Estudio — Sustentación API Node.js + MongoDB + JWT

## 1. Node.js + Express

- ¿Qué es Express y para qué sirve? (framework para crear servidores HTTP)
- Diferencia entre middleware, ruta y controlador
- ¿Qué hace `express.json()`? (parsea el body de las peticiones a JSON)
- Flujo de una petición: `req → middleware → ruta → controlador → res`

## 2. MongoDB + Mongoose

- ¿Por qué MongoDB y no SQL? (documentos vs tablas, esquema flexible)
- ¿Qué es Mongoose? ODM (Object Document Mapper) para MongoDB
- ¿Qué es un Schema? Define la estructura de los documentos
- ¿Qué son los `timestamps`? (createdAt, updatedAt automáticos)
- Validación a nivel de esquema (`required`, `min`, `unique`, `match`)
- Métodos: `find()`, `findById()`, `findByIdAndUpdate()`, `findByIdAndDelete()`
- Hook `pre('save')`: se ejecuta antes de guardar un documento

## 3. JWT (JSON Web Token)

### ¿Qué es?
Es un estándar para transmitir información de forma segura entre cliente y servidor. Está compuesto por 3 partes separadas por puntos:

```
Header.Payload.Signature
```

- **Header:** tipo de token y algoritmo de firma (`{ "alg": "HS256", "typ": "JWT" }`)
- **Payload:** datos del usuario (id, email) y metadatos (exp) — NO poner contraseñas aquí
- **Signature:** firma digital que verifica que el token no fue modificado

### ¿Cómo se genera?
```js
jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '24h' })
```

### ¿Cómo se verifica?
```js
jwt.verify(token, JWT_SECRET)
// devuelve el payload decodificado si es válido
// lanza error si expiró o es inválido
```

### ¿Dónde se guarda del lado del cliente?
- **localStorage** (sencillo pero vulnerable a XSS)
- **sessionStorage** (similar, solo dura la sesión)
- **Cookie HttpOnly** (más seguro, no accesible desde JS)

### ¿Qué pasa si expira?
- El middleware `verifyToken` detecta la expiración y devuelve 401
- El cliente debe hacer login de nuevo para obtener un nuevo token

### Flujo completo:
```
1. Cliente envía POST /api/auth/login con email y password
2. Servidor verifica credenciales con bcrypt
3. Servidor genera JWT y lo devuelve al cliente
4. Cliente guarda el token
5. Cliente envía el token en cada petición: Header "Authorization: Bearer <token>"
6. Servidor verifica el token en el middleware verifyToken
7. Si es válido, ejecuta el controlador; si no, devuelve 401
```

## 4. bcrypt y Seguridad

### ¿Por qué no guardamos la contraseña en texto plano?
Si alguien accede a la base de datos, tendría todas las contraseñas de los usuarios.

### ¿Qué es un hash?
Es una función unidireccional: se puede convertir contraseña → hash, pero no hash → contraseña.

### ¿Qué es un salt?
Es un valor aleatorio que se agrega a la contraseña antes de hashearla. Así dos usuarios con la misma contraseña tienen hashes diferentes.

### bcrypt en el proyecto:
```js
// En User.js - hook pre('save')
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar
userSchema.methods.compararPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
```

### ¿Cómo funciona bcrypt.compare()?
Toma la contraseña plana y el hash guardado, extrae el salt del hash, hashea la contraseña con ese salt, y compara si son iguales.

## 5. Arquitectura MVC

### Capas del proyecto:

| Capa | Archivos | Responsabilidad |
|------|----------|-----------------|
| **Model** | `src/models/` | Define la estructura de datos e interacción con MongoDB |
| **Controller** | `src/controllers/` | Lógica de negocio |
| **Route** | `src/routes/` | Define endpoints y conecta rutas con controladores |
| **Middleware** | `src/middleware/` | Funciones que se ejecutan ANTES del controlador |
| **Config** | `src/config/` | Configuración (conexión a MongoDB) |
| **Helpers** | `src/helpers/` | Clases utilitarias (AppError) |

### Flujo de una petición protegida:
```
Cliente → Express → authMiddleware (verifyToken) → personaController → Persona model → MongoDB
                                                         ↓
                                               errorHandler → respuesta JSON
```

## 6. Manejo de Errores

### AppError
```js
class AppError extends Error {
    constructor(mensaje, statusCode) {
        super(mensaje);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}
```

### Formato de respuesta de error:
```json
{ "status": "fail", "codigo": 400, "mensaje": "Descripción del error" }
```

## 7. Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | /api/auth/register | No | Registrar usuario |
| POST | /api/auth/login | No | Iniciar sesión |
| GET | /api/personas | Sí | Listar personas |
| GET | /api/personas/:id | Sí | Persona por ID |
| POST | /api/personas | Sí | Crear persona |
| PUT | /api/personas/:id | Sí | Actualizar persona |
| DELETE | /api/personas/:id | Sí | Eliminar persona |

## 8. Mejoras vs Versión Original

| Original | Nueva versión |
|----------|---------------|
| Datos en JSON estático | Base de datos MongoDB |
| Sin autenticación | JWT + bcrypt |
| Sin protección de rutas | Middleware verifyToken |
| Todo en un archivo | Arquitectura modular (MVC) |
| Sin manejo de errores | ErrorHandler + AppError |
| Sin variables de entorno | Config con dotenv |
| Sin documentación | README + guion de sustentación |

## 9. Posibles Preguntas del Instructor

**¿Por qué usaste Mongoose y no el driver nativo?**
> Mongoose nos da esquemas, validación y métodos helpers que facilitan el desarrollo y hacen el código más legible.

**¿Cómo se protege la contraseña?**
> Con bcrypt y 10 rondas de salting. Nunca guardamos la contraseña en texto plano, solo el hash.

**¿Qué pasa si el token expira?**
> verifyToken detecta la expiración y devuelve 401. El cliente debe iniciar sesión de nuevo.

**¿Cómo garantizas que los datos sean válidos?**
> Validación a nivel de esquema en Mongoose (required, min, match) y runValidators: true en actualizaciones.

**¿Qué ventaja tiene la arquitectura modular?**
> Separación de responsabilidades. Es más fácil de mantener, escalar y testear.
