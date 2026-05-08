# Tatacoa Verde

Este repositorio contiene un sitio web estático para la agencia turística "Tatacoa Verde".

## Estructura del proyecto
- `index.html` — página principal con paquetes turísticos.
- `opiniones.html` — página de opiniones con filtros y valoraciones.
- `login.html` — formulario de acceso de demostración.
- `css/styles.css` — estilos generales del sitio.
- `css/login.css` — estilos de la página de login.
- `js/scripts.js` — lógica interactiva de los detalles de paquete.
- `js/opiniones.js` — lógica de opiniones, filtros y me gusta.
- `js/login.js` — control de acceso simulado y visibilidad de contraseña.
- `assets/img/` — recursos gráficos usados en el sitio.

## Verificación realizada
- Las rutas relativas de CSS, JS e imágenes están correctamente configuradas.
- `index.html` carga `css/styles.css`, Font Awesome `6.5.1` y `js/scripts.js`.
- `opiniones.html` carga `css/styles.css`, Font Awesome `6.5.1` y `js/opiniones.js` con `defer`.
- `login.html` carga `css/login.css`, Font Awesome `6.5.1` y `js/login.js`.
- `css/styles.css` y `css/login.css` usan `url("../assets/img/fondo.png")` desde la carpeta correcta.
- Las imágenes referenciadas existen en `assets/img/`.
- Se verificó la carga de recursos y la estructura general del proyecto; la validación completa de HTML, CSS y JavaScript queda sujeta al estado actual de cada archivo.

## Cómo probar localmente
1. Abrir la carpeta del proyecto en un navegador.
2. Usar un servidor local desde la raíz del proyecto:
   ```bash
   python -m http.server 8000
   ```
3. Abrir `http://localhost:8000`.
4. Probar `index.html`, `opiniones.html` y `login.html`.

## Listado de archivos clave
- `index.html`
- `opiniones.html`
- `login.html`
- `css/styles.css`
- `css/login.css`
- `js/scripts.js`
- `js/opiniones.js`
- `js/login.js`
- `assets/img/logo.png`
- `assets/img/fondo.png`
- `assets/img/foto1.png`
- `assets/img/foto2.png`
- `assets/img/foto3.png`

## Preparado para GitHub
- El proyecto ya tiene un `.gitignore`.
- El contenido está listo para subir como un sitio estático.

## Notas
- El formulario de `login.html` es de demostración y no valida credenciales reales.
- La página `opiniones.html` utiliza `localStorage` para guardar reseñas y reacciones.
- El botón "Ver Detalles" en `index.html` muestra un panel dinámico de contenido.
