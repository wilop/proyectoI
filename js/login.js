// Retorna falso sí la clave no es valida.
// Retorna true sí la clave es valida.

var users = new Array();
var submit = document.getElementById("submitL");
var form = document.getElementById("login-form");

submit.addEventListener("click", function (e) {
    e.preventDefault();

    if (validate()) {
        form.submit();
        form.reset();
    }
});

function validate() {
    var form = document.getElementById("login");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    cargarUsuarios();

    if (users == null || users.length == 0) {
        alert("No users resgitered yet")
        return false;
    } else {
        for (let i = 0; i < users.length; i++) {
            var user = users[i];
            if (user["username"] == username && user["password"] == password) {
                saveUserToSessionStorage(user);
                return true;

            }
        }
        alert("User or Password incorrect!")
        return false;
    }

}

function saveUserToSessionStorage(user) {
    if (user != null) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
    }
}

function cargarUsuarios() {
    if (typeof (Storage !== "undefined")) {
        var registro = JSON.parse(localStorage.getItem("users"));
        if (registro != null) {
            for (let i = 0; i < registro.length; i++) {
                users[i] = registro[i];
            }
        }

    }
}