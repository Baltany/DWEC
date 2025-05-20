    let usuario = document.getElementById("profesor");
    let password = document.getElementById("password");
    let botonAcceder = document.querySelector('input[type="button"]');
    let mensajeBienvenida = document.createElement("div");
    mensajeBienvenida.className = "oculto";
    mensajeBienvenida.style.backgroundColor = "white";
    mensajeBienvenida.style.color = "black";
    mensajeBienvenida.style.padding = "10px";
    document.body.insertBefore(mensajeBienvenida, document.body.firstChild);

    botonAcceder.addEventListener("click", function() {
        if (usuario.value === "" || password.value === "") {
            alert("Usuario y contraseña son obligatorios.");
        } else if (usuario.value === "root" && password.value === "_root55_") {
            mensajeBienvenida.innerHTML = "Bienvenido Administrador";
            mensajeBienvenida.classList.remove("oculto");
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
    