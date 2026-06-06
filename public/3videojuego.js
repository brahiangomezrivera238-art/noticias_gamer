let posts = [];
let currentUser = JSON.parse(sessionStorage.getItem('gp_user')) || null;

async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        posts = await response.json();
        renderPosts();
    } catch (error) {
        console.error("Error cargando posts:", error);
    }
}

// CONTROL DE INTERFAZ
function checkLoginState() {
    if (currentUser) {
        document.getElementById('contact-section').style.display = 'none';
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('editor-section').style.display = 'block';
        document.getElementById('edit-section').style.display = 'none'; 
    } else {
        document.getElementById('contact-section').style.display = 'block';
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('editor-section').style.display = 'none';
        document.getElementById('edit-section').style.display = 'none';
    }
    renderPosts();
}

// EVENTO DE LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        
        const data = await res.json();

        if (data.success) {
            currentUser = { id: data.userId, username: data.username };
            sessionStorage.setItem('gp_user', JSON.stringify(currentUser));
            document.getElementById('loginError').style.display = 'none';
            document.getElementById('loginForm').reset();
            checkLoginState(); 
        } else {
            document.getElementById('loginError').style.display = 'block';
        }
    } catch (error) {
        alert("Error de conexión con el servidor.");
    }
});

// EVENTO DE CERRAR SESIÓN
function logout() {
    sessionStorage.removeItem('gp_user');
    currentUser = null;
    checkLoginState();
}

// EVENTO DE CONTACTO (Simulado)
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); 
        alert('¡Gracias! Hemos recibido tu solicitud. Pronto te contactaremos por correo.');
        this.reset(); 
    });
}

// EVENTO DE PUBLICAR NOTICIA
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPostData = {
        titulo: document.getElementById('postTitle').value,
        contenido: document.getElementById('postContent').value,
        img: document.getElementById('postImg').value,
        categoria: document.getElementById('postCategory').value,
        autorId: currentUser ? currentUser.id : 1
    };

    const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPostData)
    });

    if (res.ok) {
        document.getElementById('postForm').reset();
        await loadPosts();
    } else {
        alert("Error al publicar.");
    }
});

// DIBUJAR NOTICIAS EN PANTALLA
function renderPosts() {
    const container = document.getElementById('postsContainer');
    const filter = document.getElementById('filterCategory').value;
    container.innerHTML = '';

    const filtered = posts.filter(p => filter === 'todos' || p.categoria === filter);

    filtered.forEach(p => {
        const adminButtons = currentUser ? `
            <div style="display:flex; gap:15px;">
                <button onclick="prepareEdit(${p.id})" style="color:#eab308; background:none; border:none; cursor:pointer; font-weight:bold; font-size: 0.9rem;">✏️ Editar</button>
                <button onclick="deletePost(${p.id})" style="color:var(--accent); background:none; border:none; cursor:pointer; font-weight:bold; font-size: 0.9rem;">🗑️ Borrar</button>
            </div>
        ` : '';

        container.innerHTML += `
            <article class="news-card">
                <img src="${p.img}" class="news-img" alt="Imagen">
                <div class="news-body">
                    <span class="badge">${p.categoria}</span>
                    <h3 style="margin: 10px 0; color: var(--text);">${p.titulo}</h3>
                    <p style="color: #ccc; font-size: 0.9rem;">${p.contenido}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
                        <small style="color: #666;">📅 ${p.fecha}</small>
                        ${adminButtons}
                    </div>
                </div>
            </article>
        `;
    });
}

// BORRAR NOTICIA
async function deletePost(id) {
    if (confirm("¿Borrar permanentemente?")) {
        await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        await loadPosts();
    }
}

// ==========================================
// CRUD: EDITAR (Versión con Alertas)
// ==========================================

function prepareEdit(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('editId').value = post.id;
    document.getElementById('editTitle').value = post.titulo;
    document.getElementById('editContent').value = post.contenido;
    document.getElementById('editImg').value = post.img;
    document.getElementById('editCategory').value = post.categoria;

    document.getElementById('editor-section').style.display = 'none';
    document.getElementById('edit-section').style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
    document.getElementById('editForm').reset();
    document.getElementById('edit-section').style.display = 'none';
    document.getElementById('editor-section').style.display = 'block';
}

// AQUÍ ESTÁ LA MAGIA PARA VER EL ERROR
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const updatedData = {
        titulo: document.getElementById('editTitle').value,
        contenido: document.getElementById('editContent').value,
        img: document.getElementById('editImg').value,
        categoria: document.getElementById('editCategory').value
    };

    try {
        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (res.ok) {
            cancelEdit(); 
            await loadPosts(); 
        } else {
            // Si hay error, leemos el mensaje exacto que manda el servidor
            let errorMsg = "Error desconocido";
            try {
                const errorData = await res.json();
                errorMsg = errorData.message;
            } catch(err) {
                errorMsg = "No se encontró la ruta en el servidor (Posible caché vieja).";
            }
            alert("⚠️ Fallo al guardar: " + errorMsg);
        }
    } catch (error) {
        alert("⚠️ Error de red o servidor apagado.");
    }
});

// FILTRO DE CATEGORÍAS
document.getElementById('filterCategory').addEventListener('change', renderPosts);

// INICIAR APLICACIÓN
loadPosts();
checkLoginState();