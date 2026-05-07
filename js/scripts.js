(function () {
    const destinos = [
        {
            nombre: "Atardecer en el Desierto",
            precio: "$250K",
            imagen: "assets/img/foto1.png",
            descripcion: "Explora esta joya arquitectónica iluminada en un ambiente mágico",
            ubicacion: "Zipaquirá",
            personas: "2-6",
            duracion: "2 días"
        },
        {
            nombre: "Aventura en Río Salvaje",
            precio: "$180K",
            imagen: "assets/img/foto2.png",
            descripcion: "Disfruta de rápidos y naturaleza en una experiencia llena de adrenalina",
            ubicacion: "Caño Cristales",
            personas: "1-4",
            duracion: "1 día"
        },
        {
            nombre: "Catedral de Sal - Experiencia Nocturna",
            precio: "$150K",
            imagen: "assets/img/foto3.png",
            descripcion: "Contempla un espectáculo natural con colores únicos del cielo",
            ubicacion: "Tatacoa",
            personas: "2-8",
            duracion: "Medio día"
        }
    ];

    function obtenerElementosDetalle() {
        return {
            homeSection: document.getElementById("home"),
            detalleSection: document.getElementById("detalle"),
            detalleMainImg: document.getElementById("detalle-main-img"),
            detallePrecio: document.getElementById("detalle-precio"),
            detalleDuracion: document.getElementById("detalle-duracion"),
            detalleTitulo: document.getElementById("detalle-titulo"),
            detalleDescripcion: document.getElementById("detalle-descripcion"),
            detalleUbicacion: document.getElementById("detalle-ubicacion"),
            detallePersonas: document.getElementById("detalle-personas")
        };
    }

    function mostrarSeccionDetalle(index) {
        const destino = destinos[index];
        const {
            homeSection,
            detalleSection,
            detalleMainImg,
            detallePrecio,
            detalleDuracion,
            detalleTitulo,
            detalleDescripcion,
            detalleUbicacion,
            detallePersonas
        } = obtenerElementosDetalle();

        if (!destino || !detalleSection || !homeSection) {
            return;
        }

        if (detalleMainImg) {
            detalleMainImg.src = destino.imagen;
            detalleMainImg.alt = destino.nombre;
        }
        if (detallePrecio) detallePrecio.textContent = destino.precio;
        if (detalleDuracion) detalleDuracion.textContent = destino.duracion;
        if (detalleTitulo) detalleTitulo.textContent = destino.nombre;
        if (detalleDescripcion) detalleDescripcion.textContent = destino.descripcion;
        if (detalleUbicacion) detalleUbicacion.textContent = destino.ubicacion;
        if (detallePersonas) detallePersonas.textContent = destino.personas;

        homeSection.style.display = "none";
        detalleSection.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function volverInicio() {
        const { homeSection, detalleSection } = obtenerElementosDetalle();

        if (!detalleSection || !homeSection) {
            return;
        }

        detalleSection.style.display = "none";
        homeSection.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function inicializarEventos() {
        const botonesDetalle = document.querySelectorAll("section.cards-section:not(#detalle) .card .btn-detalles");
        const botonVolver = document.querySelector("#detalle .btn-detalles");

        botonesDetalle.forEach((boton, index) => {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                mostrarSeccionDetalle(index);
            });
        });

        if (botonVolver) {
            botonVolver.addEventListener("click", function (event) {
                event.preventDefault();
                volverInicio();
            });
        }
    }

    document.addEventListener("DOMContentLoaded", inicializarEventos);
})();
