const form = document.querySelector("form");
const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const eyeIcon = document.querySelector(".fa-eye");

/* MOSTRAR / OCULTAR CONTRASEÑA */
eyeIcon.addEventListener("click", () => {

    if(password.type === "password"){
        password.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }else{
        password.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }

});


/* LOGIN */
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const correo = email.value.trim();
    const clave = password.value.trim();

    /* VALIDAR CAMPOS VACIOS */
    if(correo === "" || clave === ""){

        mostrarMensaje(
            "Todos los campos son obligatorios",
            "error"
        );

        return;
    }

    /*
     * DEMO / MOCK
     * No se validan credenciales reales en el frontend.
     * La autenticación real debe hacerse en backend.
     */
    mostrarMensaje(
        "Acceso de demostración: autenticación simulada",
        "success"
    );

    /* REDIRECCION */
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1800);

});


/* FUNCION MENSAJES */
function mostrarMensaje(texto, tipo){

    /* ELIMINAR ALERTAS ANTERIORES */
    const alertaExistente =
        document.querySelector(".alerta");

    if(alertaExistente){
        alertaExistente.remove();
    }

    /* CREAR ALERTA */
    const alerta = document.createElement("div");

    alerta.classList.add("alerta");

    if(tipo === "success"){
        alerta.classList.add("success");
    }else{
        alerta.classList.add("error");
    }

    alerta.textContent = texto;

    /* INSERTAR */
    form.prepend(alerta);

    /* ELIMINAR */
    setTimeout(() => {
        alerta.remove();
    }, 3000);

}
