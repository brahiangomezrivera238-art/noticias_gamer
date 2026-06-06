# Arquitectura
Sistema Web Full-Stack.
- Cliente: HTML/CSS/JS.
- Servidor: Node.js con Express.
- Persistencia: Archivo JSON.

# Arquitectura y Justificación Técnica

## 1. Estilo Arquitectónico
El sistema utiliza un patrón **Cliente-Servidor**. El frontend opera como una Single Page Application (SPA) rudimentaria que consume servicios de una API REST proveída por el backend. 

## 2. Separación de Responsabilidades
* **Frontend (`public/`):** Se encarga exclusivamente de la interfaz de usuario, captura de eventos, validaciones visuales y peticiones asíncronas (Fetch API). No almacena secretos.
* **Backend (`server.js`):** Actúa como controlador central. Expone los endpoints, maneja la lógica de autenticación y administra la lectura/escritura del sistema de archivos.
* **Persistencia (`database.json`):** Almacena el estado de las noticias. Solo el backend tiene permisos para interactuar con este archivo.

## 3. Justificación del Stack Tecnológico

| Capa | Tecnología Elegida | Alternativas Consideradas | Justificación Técnica | Riesgos o Limitaciones |
|---|---|---|---|---|
| **Frontend** | HTML/CSS/JS Vanilla | React, Vue | Menor curva de aprendizaje, control total, sin tiempos de compilación. | Difícil escalabilidad para componentes muy complejos. |
| **Backend** | Node.js + Express | Python/FastAPI | Coherencia de lenguaje (JS en ambas capas), rapidez para levantar el servidor. | Gestión de callbacks/promesas. |
| **Persistencia**| Archivo JSON | SQLite, MySQL | Simplicidad extrema para el prototipo, no requiere instalación de software extra. | Riesgo de concurrencia si varios admins guardan al tiempo. |