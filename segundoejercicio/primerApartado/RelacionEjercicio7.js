document.getElementById("login").addEventListener("click", function() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        alert("Login correcto");
        console.log("Funciona");
    } else {
        console.log("Error");
        alert("Contraseña y/o usuario incorrecto.");

    }
});


