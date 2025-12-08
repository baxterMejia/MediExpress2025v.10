
🐱 Cat Explorer App

Aplicación web desarrollada con Angular 17 que permite explorar razas de gatos y gestionar autenticación de usuarios. Incluye vistas protegidas, consumo de APIs, filtros dinámicos, diseño responsive y arquitectura limpia.

Comandos de depuración:
npm i
npm start

---

🚀 Tecnologías usadas

- Angular 17 (Standalone Components)
- RxJS
- TailwindCSS
- Signals API
- Angular Router
- HttpClient
- Clean Architecture
- SOLID Principles

---

🧭 Estructura general

src/
├── app/
│   ├── core/              # Servicios y lógica central (AuthService, CatService)
│   ├── shared/            # Componentes reutilizables (Spinner, modales, etc.)
│   ├── guards/            # Rutas protegidas
│   ├── login/             # LoginComponent
│   ├── register/          # RegisterComponent
│   ├── profile/           # Vista protegida para el usuario logueado
│   └── app.component.ts   # Layout principal con navbar, sidebar, footer

---

📦 Funcionalidades por vista

✅ Vista 1 - Exploración de razas
- Lista desplegable con las razas disponibles.
- Al seleccionar una raza se muestran:
  - Carrusel de imágenes.
  - Información detallada.
  - Tabla con atributos destacados.

✅ Vista 2 - Búsqueda
- Filtro de texto para buscar razas dentro del dropdown de selección.

✅ Vista 3 - Login
- Formulario de login conectado al backend.
- Guarda token en localStorage y gestiona sesión con Signals.

✅ Vista 4 - Registro
- Formulario para crear cuenta con nombre de usuario, email y contraseña.

✅ Vista 5 - Vista protegida
- Accesible solo si el usuario está autenticado.
- Muestra datos del usuario logueado y detalles de la raza seleccionada.

---

🔐 Seguridad
- Guard para proteger rutas privadas.
- Manejo de token en localStorage.

---

