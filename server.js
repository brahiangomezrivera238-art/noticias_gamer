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

// ELIMINAR NOTICIA
app.delete('/api/posts/:id', (req, res) => {
    const db = readDB();
    const id = parseInt(req.params.id);
    db.posts = db.posts.filter(p => p.id !== id);
    writeDB(db);
    res.json({ success: true });
});

// LOGIN (ÚNICO Y CORREGIDO)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Aquí validamos. Si quieres cambiar la clave, hazlo aquí.
    if (username === 'admin' && password === '1234') {
        res.json({ success: true, userId: 1, username: 'admin' });
    } else {
        res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));