# primeraApi

Este proyecto es un servidor web básico hecho con Express que devuelve los datos de `bd.json` en formato JSON cuando se accede a la ruta `/`.

## Archivos principales

### `index.js`

Este archivo contiene la lógica del servidor.

- `import express from 'express';`
  - Carga la librería Express para poder crear y manejar un servidor web.

- `import datos from './bd.json' with { type: 'json' };`
  - Carga el archivo `bd.json` como un objeto JSON dentro de la variable `datos`.

- `const app = express();`
  - Crea la aplicación Express que usaremos para definir rutas y escuchar conexiones.

- `app.get('/', (req, res) => { ... });`
  - Define la ruta raíz `/`.
  - `req` es la solicitud que hace el cliente.
  - `res` es la respuesta que el servidor enviará.

- `res.json(datos);`
  - Envía los datos cargados desde `bd.json` como respuesta en formato JSON.
  - Esto hace que el navegador o cualquier cliente reciba la lista de objetos con `id`, `nombre` y `edad`.

- `app.listen(3000, () => { ... });`
  - Inicia el servidor en el puerto `3000`.
  - El callback imprime un mensaje cuando el servidor está listo.

### `package.json`

Este archivo define la configuración del proyecto, los scripts que se pueden ejecutar y las dependencias necesarias.

A continuación tienes `package.json` línea por línea con su explicación.

```json
{
  "name": "prueba",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "erick",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

- `{` : abre el objeto JSON principal.
- `"name": "prueba",` : nombre del proyecto.
- `"version": "1.0.0",` : versión del proyecto.
- `"description": "",` : descripción corta del proyecto (vacía por ahora).
- `"license": "ISC",` : licencia del proyecto.
- `"author": "erick",` : autor del proyecto.
- `"type": "module",` : indica que se usan módulos ES en lugar de `require`.
- `"main": "index.js",` : archivo principal que se considera el punto de entrada.
- `"scripts": {` : inicio de los scripts ejecutables con npm.
  - `"start": "nodemon index.js",` : comando que se ejecuta con `npm start`.
    - `nodemon` reinicia el servidor cuando hay cambios en el código.
  - `"test": "echo \"Error: no test specified\" && exit 1"` : comando de prueba por defecto.
    - Solo imprime un mensaje y devuelve un código de error porque no hay pruebas.
- `},` : cierra la sección `scripts`.
- `"dependencies": {` : inicio de las dependencias necesarias para ejecutar el proyecto en producción.
  - `"express": "^5.2.1"` : Express es el framework que maneja el servidor web.
- `},` : cierra la sección `dependencies`.
- `"devDependencies": {` : inicio de las dependencias necesarias solo para desarrollo.
  - `"nodemon": "^3.1.14"` : herramienta que reinicia el servidor automáticamente al guardar cambios.
- `}` : cierra la sección `devDependencies`.
- `}` : cierra el objeto JSON principal.

En palabras humanas: `package.json` es la hoja de ruta de tu proyecto. Dice cómo iniciarlo, qué librerías usa y qué herramientas de desarrollo necesita.

### `bd.json`

Este archivo actúa como una base de datos local en formato JSON.

El archivo contiene una lista (arreglo) de objetos, donde cada objeto representa una persona.

Aquí está la explicación línea por línea del contenido de `bd.json`:

- `[` : abre el arreglo principal que contiene todos los registros.
- `{` : inicia el primer objeto de la lista.
  - `"id": 1,` : identificador único del primer registro.
  - `"nombre": "Juan",` : nombre de la primera persona.
  - `"edad": 20` : edad de la primera persona.
- `},` : cierra el primer objeto y separa al siguiente objeto.
- `{` : inicia el segundo objeto.
  - `"id": 2,` : identificador único del segundo registro.
  - `"nombre": "Maria",` : nombre de la segunda persona.
  - `"edad": 22` : edad de la segunda persona.
- `},` : cierra el segundo objeto.

Este patrón se repite para cada persona en la lista. El objeto final se cierra con `}` y luego se cierra el arreglo con `]`.

En palabras humanas: cada conjunto de llaves `{}` es una persona y cada persona tiene un número de identificación, un nombre y una edad.

> Nota: JSON no permite comentarios dentro del archivo `bd.json`.
> Por eso la explicación completa está documentada en este README.

### `package.json`

Este archivo define la configuración del proyecto y sus dependencias.

A continuación se describe cada línea importante:

- `{` : abre el objeto JSON principal.
- `"name": "prueba",` : nombre del proyecto.
- `"version": "1.0.0",` : versión del proyecto.
- `"description": "",` : descripción corta (vacía en este caso).
- `"license": "ISC",` : tipo de licencia del proyecto.
- `"author": "erick",` : autor del proyecto.
- `"type": "module",` : indica que el proyecto usa módulos ES (`import` / `export`).
- `"main": "index.js",` : archivo principal del proyecto.
- `"scripts": {` : inicio de los comandos configurados para npm.
  - `"start": "nodemon index.js",` : comando `npm start` que ejecuta `nodemon index.js`.
  - `"test": "echo \"Error: no test specified\" && exit 1"` : comando `npm test` por defecto.
- `},` : cierra la sección de scripts.
- `"dependencies": {` : paquetes necesarios para ejecutar la aplicación.
  - `"express": "^5.2.1"` : Express es el framework que usa la app.
- `},` : cierra las dependencias.
- `"devDependencies": {` : paquetes necesarios solo en desarrollo.
  - `"nodemon": "^3.1.14"` : nodemon reinicia el servidor al detectar cambios.
- `}` : cierra las devDependencies.
- `}` : cierra el objeto JSON principal.

En palabras humanas: `package.json` es la hoja de configuración del proyecto, donde dices qué librerías necesitas y cómo ejecutar tu servidor.

Para ver la explicación completa con más detalle, abre el archivo `package-json-comentado.md` en el proyecto.

### `package-lock.json`

Este archivo no se edita manualmente.

- Guarda las versiones exactas de todas las dependencias instaladas.
- Garantiza que el proyecto se instale igual en cualquier máquina.

## Cómo usar el proyecto

1. Asegúrate de tener Node.js instalado.
2. Desde la carpeta `primeraApi`, instala dependencias con:

```bash
npm install
```

3. Inicia el servidor con:

```bash
npm start
```

4. Abre en tu navegador:

```bash
http://localhost:3000/
```

Verás los datos de `bd.json` en formato JSON.

## Flujo de ejecución

1. `index.js` importa Express y los datos de `bd.json`.
2. Se crea la aplicación Express (`app`).
3. Se define una ruta GET para `/`.
4. Cuando un cliente pide `/`, el servidor responde con `datos`.
5. El servidor se pone a escuchar en el puerto `3000`.
6. Si `nodemon` está en ejecución, cualquier cambio en `index.js` reiniciará el servidor automáticamente.
