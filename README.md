# Tatacoa Verde

Este repositorio contiene un sitio estático sencillo de presentación turística llamado "Tatacoa Verde".

Resumen de cambios realizados
- Actualicé la referencia a Font Awesome para usar la misma versión en todas las páginas (6.5.1).
- Renombré el archivo JavaScript principal de `js/scrips.js` a `js/scripts.js` (corrigiendo un typo) y actualicé la referencia en `index.html`.
- Eliminé un duplicado innecesario de la imagen de fondo ubicado en `css/assets/img/fondo.png`.
- Revisé y verifiqué las rutas relativas de CSS/JS/imagenes; las rutas apuntan a `assets/img/...`, `css/...` y `js/...`.

Estructura importante
- `index.html` — página principal (sitio público)
- `login.html` — página de acceso al panel
- `css/styles.css`, `css/login.css` — estilos
- `js/scripts.js` — lógica de interactividad para la vista de detalles
- `js/login.js` — lógica del formulario de login
- `assets/img/` — imágenes usadas por el sitio

Notas sobre consistencia
- Todas las referencias a Font Awesome usan la versión `6.5.1`.
- Las rutas en los CSS usan `url("../assets/img/...")` siendo `css/` la carpeta padre correcta.
- Las referencias a los archivos JS están en `js/` y ahora `index.html` carga `js/scripts.js`.

Cómo probar localmente

1. Abrir `index.html` en el navegador (doble clic o usar un servidor estático).
	 - Recomendado (HTTP): usar un servidor simple como `python -m http.server 8000` desde la raíz del proyecto y abrir `http://localhost:8000`.
2. Navegar a `login.html` para probar el formulario de inicio de sesión.

Preparado para GitHub (sólo archivos necesarios)
- Ya existe un archivo `.gitignore` con entradas comunes (`.DS_Store`, `node_modules/`, `.vscode/`, `dist/`, `.env`).
- Archivos esenciales:
	- `index.html`, `login.html`
	- `css/` (styles.css, login.css)
	- `js/` (scripts.js, login.js)
	- `assets/img/` (imágenes usadas)
	- `.gitignore`, `README.md`

Siguientes pasos opcionales
- Las imágenes `foto 1.png`, `foto 2.png`, `foto 3.png` fueron renombradas a `foto1.png`, `foto2.png`, `foto3.png` respectivamente para eliminar espacios en los nombres.
- Añadir un `index.html` mínimo para producción o un pequeño script de build si se desea automatizar (no incluido por defecto).

Contacto
- Si quieres que haga los cambios extra (renombrar imágenes, añadir acciones de GitHub, o crear un README más detallado), dime y lo implemento.