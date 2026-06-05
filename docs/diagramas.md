Markdown
# Diagramas Técnicos - Gaming Pulse

## D01. Diagrama de Casos de Uso
```mermaid
graph TD
    Usuario[Usuario] --> |Consulta| Listado(Ver Videojuegos)
    Usuario --> |Lee| Detalle(Ver Detalle)
    Admin[Administrador] --> |Autenticación| Login(Login)
    Admin --> |Gestiona| CRUD(Crear/Editar/Eliminar)
    Login --> CRUD
D02. Flujo de Usuario
Fragmento de código
stateDiagram-v2
    [*] --> Inicio
    Inicio --> FiltrarCategoria
    Inicio --> Login
    Login --> PanelControl
    PanelControl --> GestionarPosts
    GestionarPosts --> Inicio
D03. Diagrama Entidad-Relación (Base de Datos)
Fragmento de código
erDiagram
    USUARIOS {
        int id PK
        string username
    }
    POSTS {
        int id PK
        string titulo
        string contenido
        int autorId FK
    }
    USUARIOS ||--o{ POSTS : "Crea"
D04. Arquitectura del Sistema
Fragmento de código
graph LR
    Navegador[Frontend] <-->|HTTP| API[API Express]
    API <-->|fs| DB[(database.json)]
D05. Diagrama de Componentes
Fragmento de código
graph TD
    UI[Interfaz HTML/CSS] --> Lógica[3videojuego.js]
    Lógica --> API[Servidor Express]
    API --> JSON[Archivo JSON]
D06. Diagrama de Secuencia (Crear Post)
Fragmento de código
sequenceDiagram
    participant Admin
    participant Frontend
    participant Backend
    participant JSON
    
    Admin->>Frontend: Click en Publicar
    Frontend->>Backend: POST /api/posts
    Backend->>JSON: Escribir nuevo post
    JSON-->>Backend: OK
    Backend-->>Frontend: 201 Creado
D07. Diagrama de Despliegue
Fragmento de código
graph TD
    PC[Computador Local] --> Node[Node.js Runtime]
    Node --> Express[Servidor en Puerto 3000]
D08. Estructura de Carpetas
Plaintext
gaming-pulse/
├── public/       # Frontend (HTML, CSS, JS)
├── docs/         # Documentación (Diagramas, SRS)
├── server.js     # Backend
├── database.json # Base de datos local
└── package.json  # Dependencias