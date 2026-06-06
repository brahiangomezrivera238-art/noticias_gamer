const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'database.json');

function readDB() {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// OBTENER NOTICIAS
app.get('/api/posts', (req, res) => {
    res.json(readDB().posts);
});

// CREAR NOTICIA
app.post('/api/posts', (req, res) => {
    const { titulo, contenido, categoria, img, autorId } = req.body;
    if (!titulo || !contenido) return res.status(400).json({ message: "Faltan datos" });

    const db = readDB();
    const newPost = {
        id: Date.now(),
        titulo, contenido, categoria, img,
        fecha: new Date().toLocaleDateString('es-ES'),
        autorId: autorId || 1
    };
    
    db.posts.unshift(newPost);
    writeDB(db);
    res.status(201).json(newPost);
});

// ACTUALIZAR NOTICIA (Con Rayos X)
app.put('/api/posts/:id', (req, res) => {
    try {
        const db = readDB();
        const id = req.params.id; 
        const { titulo, contenido, categoria, img } = req.body;

        const postIndex = db.posts.findIndex(p => String(p.id) === String(id));
        
        if (postIndex !== -1) {
            db.posts[postIndex].titulo = titulo;
            db.posts[postIndex].contenido = contenido;
            db.posts[postIndex].categoria = categoria;
            db.posts[postIndex].img = img;
            
            writeDB(db);
            res.json(db.posts[postIndex]); // Todo salió bien
        } else {
            res.status(404).json({ message: "La base de datos no encontró el ID de esta noticia." });
        }
    } catch (error) {
        res.status(500).json({ message: "El archivo database.json tiene un problema." });
    }
});

// ELIMINAR NOTICIA
app.delete('/api/posts/:id', (req, res) => {
    const db = readDB();
    const idABorrar = String(req.params.id);
    db.posts = db.posts.filter(p => String(p.id) !== idABorrar);
    writeDB(db);
    res.json({ success: true });
});

// LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.json({ success: true, userId: 1, username: 'admin' });
    } else {
        res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));