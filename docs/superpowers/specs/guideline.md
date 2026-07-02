# Guión de Sustentación — API Node.js + MongoDB + JWT

## 1. Introducción (30 seg)

> "Buenos días. Hoy voy a presentar una API REST construida con Node.js, Express y MongoDB, que implementa autenticación mediante JWT y protección de rutas."

---

## 2. ¿Qué hace la API? (30 seg)

> "La API permite gestionar un directorio de personas con operaciones CRUD (crear, leer, actualizar, eliminar). Pero a diferencia de la versión anterior, ahora los datos se almacenan en MongoDB y el acceso está protegido: solo usuarios autenticados pueden consumir los endpoints."

---

## 3. Arquitectura (1 min)

Mostrar en la terminal o en papel:

```
Cliente → Express → Middleware verifyToken → Controlador → Mongoose → MongoDB
```

> "La arquitectura sigue el patrón MVC: los modelos definen la estructura de datos en MongoDB, los controladores contienen la lógica de negocio, y las rutas conectan los endpoints con los controladores. El middleware de autenticación se ejecuta antes de los controladores para verificar que el usuario tenga un token válido."

> "El flujo es: el cliente hace una petición → Express la recibe → si la ruta está protegida, pasa por verifyToken → si el token es válido, ejecuta el controlador → el controlador usa Mongoose para consultar MongoDB → y devuelve la respuesta JSON."

---

## 4. MongoDB + Mongoose (1 min)

> "Migré los datos de un archivo JSON estático a MongoDB usando Mongoose, que es un ODM (Object Document Mapper). Un ODM nos permite definir esquemas y validar los datos antes de guardarlos."

Mostrar `src/models/Persona.js`:

> "Aquí vemos el schema de Persona: definimos que `nombre` y `email` son strings requeridos, `edad` es un número con valor mínimo 0. Mongoose se encarga de validar estos datos automáticamente."

> "La conexión a MongoDB se hace en `src/config/db.js` usando la URI que está en el archivo `.env`."

---

## 5. Autenticación JWT (2 min — parte más importante)

> "JWT significa JSON Web Token. Es un estándar para transmitir información de forma segura entre el cliente y el servidor."

> "Cuando un usuario se registra o inicia sesión, el servidor genera un token JWT que contiene: el ID del usuario, su email, y una fecha de expiración. Este token se firma digitalmente con una clave secreta guardada en el servidor."

Mostrar `src/controllers/authController.js`:

> "En el registro: recibimos nombre, email y contraseña. Verificamos que el email no exista. Si no existe, creamos el usuario. Antes de guardarlo, gracias al hook `pre('save')` que ven en el modelo User, la contraseña se hashea con bcrypt — esto significa que nunca guardamos la contraseña en texto plano."

> "En el inicio de sesión: recibimos email y contraseña. Buscamos al usuario, comparamos la contraseña usando bcrypt, y si coincide, generamos un token JWT con expiración de 24 horas y lo devolvemos al cliente."

> "El cliente debe guardar este token y enviarlo en cada petición a rutas protegidas mediante el header `Authorization: Bearer <token>`."

---

## 6. Protección de rutas (1 min)

Mostrar `src/middleware/authMiddleware.js`:

> "El middleware `verifyToken` se ejecuta antes de los controladores de personas. Su trabajo es: extraer el token del header, verificar que sea válido usando `jwt.verify()`, buscar al usuario en la base de datos, y si todo está bien, pasar al siguiente middleware o controlador."

> "Si el token no se proporciona, es inválido o está expirado, el middleware responde automáticamente con un error 401."

Mostrar `src/routes/personaRoutes.js`:

> "Aquí vemos cómo se aplica la protección: `router.use(verifyToken)` antes de definir las rutas. Esto hace que todas las rutas de personas requieran autenticación. Si el middleware falla, ni siquiera se ejecuta el controlador."

---

## 7. Endpoints (30 seg)

Mostrar la tabla:

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | /api/auth/register | No | Registrar usuario |
| POST | /api/auth/login | No | Iniciar sesión |
| GET | /api/personas | Sí | Listar personas |
| GET | /api/personas/:id | Sí | Persona por ID |
| POST | /api/personas | Sí | Crear persona |
| PUT | /api/personas/:id | Sí | Actualizar persona |
| DELETE | /api/personas/:id | Sí | Eliminar persona |

> "Tenemos 7 endpoints: 2 públicos para autenticación y 5 protegidos para el CRUD de personas."

---

## 8. Mejoras respecto a la versión anterior (30 seg)

> "Las mejoras más significativas son: migración de JSON a MongoDB, autenticación JWT con contraseñas hasheadas, protección de rutas con middleware, arquitectura modular separando responsabilidades, manejo centralizado de errores con respuestas JSON consistentes, y configuración mediante variables de entorno."

---

## 9. Demo en vivo (2 min)

1. **Iniciar servidor:** `npm run dev`
2. **Registrar usuario:** `curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"nombre":"Admin","email":"admin@test.com","password":"123456"}'`
3. **Iniciar sesión:** `curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@test.com","password":"123456"}'`
4. **Probar ruta protegida SIN token:** `curl http://localhost:3000/api/personas` → debe dar 401
5. **Probar ruta protegida CON token:** `curl http://localhost:3000/api/personas -H "Authorization: Bearer TOKEN_AQUI"` → debe dar 200

---

## 10. Posibles preguntas del instructor

**¿Por qué usaste Mongoose y no el driver nativo de MongoDB?**
> "Mongoose nos da esquemas, validación y métodos helpers que facilitan el desarrollo y hacen el código más legible y mantenible."

**¿Cómo se protege la contraseña?**
> "Se usa bcrypt con 10 rondas de salting. El hash se guarda en la base de datos, nunca la contraseña en texto plano."

**¿Qué pasa si el token expira?**
> "El middleware verifyToken detecta la expiración y devuelve un error 401. El cliente debe iniciar sesión de nuevo para obtener un token nuevo."

**¿Cómo se garantiza que los datos sean válidos?**
> "Mongoose tiene validación a nivel de esquema (required, min, match) y además los controladores usan `runValidators: true` en las actualizaciones."

**¿Qué ventaja tiene esta arquitectura modular?**
> "Separación de responsabilidades: si algo falla en autenticación, sé que debo revisar authMiddleware o authController, no todo el archivo. Además es más fácil de mantener y escalar."
