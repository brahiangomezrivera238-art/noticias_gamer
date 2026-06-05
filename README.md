# 🎮 Gaming Pulse - Portal Pro

## Descripción
Gaming Pulse es una aplicación web full-stack diseñada para la gestión y publicación de noticias, reseñas y novedades de hardware en la industria de los videojuegos. Resuelve la necesidad de tener un portal centralizado donde un equipo de redacción pueda publicar contenido de forma rápida, y los usuarios puedan consumirlo con una interfaz moderna y responsiva.

## Integrantes
* **Brahian David Gómez Rivera** - Desarrollo Backend y Frontend.
* **Samuel molina** - Documentación y Pruebas - Diseño de UI/UX y Arquitectura.

## Stack Tecnológico
* **Frontend:** HTML5, CSS3, JavaScript Vanilla (Fetch API). Elegido por su ligereza y control total sobre el DOM sin dependencias.
* **Backend:** Node.js con Express. Elegido por su velocidad para crear APIs RESTful.
* **Persistencia:** Archivo `database.json` gestionado desde el backend. Elegido como solución académica para garantizar la persistencia local sin requerir un servidor de base de datos externo.

## Arquitectura
El proyecto sigue un patrón Cliente-Servidor (SPA + API). Para más detalles, consultar [docs/arquitectura.md](docs/arquitectura.md).

## Funcionalidades Principales
* Panel de administración protegido (Login).
* CRUD completo de noticias (Crear, Leer, Eliminar).
* Filtrado de publicaciones por categoría.
* Formulario de contacto para reclutamiento de redactores.
* Diseño UI/UX responsivo (Glassmorphism).

## Cómo ejecutar localmente
1. Clonar el repositorio: `git clone [URL_DEL_REPO]`
2. Instalar dependencias: `npm install express`
3. Iniciar el servidor: `node server.js`
4. Abrir en el navegador: `http://localhost:3000`

## Endpoints Principales
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/posts` | Lista todas las noticias |
| POST | `/api/posts` | Crea una nueva noticia |
| DELETE | `/api/posts/:id` | Elimina una noticia por ID |
| POST | `/api/login` | Valida credenciales de acceso |

## Documentación
* [Software Requirements Specification (SRS)](docs/SRS.md)
* [Arquitectura y Tecnologías](docs/arquitectura.md)