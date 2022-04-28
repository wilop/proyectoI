// Retorna falso sí la clave no es valida.
// Retorna true sí la clave es valida.

var users = new Array();
var submit = document.getElementById("submit");

submit.addEventListener("click", function (e) {
    var form = document.getElementById("login");
    e.preventDefault();
    if (validate()) {
        form.submit();
    }
    alert('Firstname too short or to long!');

});

function validate() {
    var form = document.getElementById("login");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var user = { username: +"'" + username + "'", password: +"'" + password + "'" };

    cargarUsuarios();

    if (users.length == 0) {
        return false;
    }
    alert(users.length);
    users.forEach(element => {
        if (element["username"] !== username) {
            alert(username);
            alert(element["username"]);
            return false;
        }
        if (element["password"] !== password) {
            alert(element["password"]);
            return false;
        }

    });
    return true;
}

function validarClave() {
    let clave = document.getElementById('clave').value;

    if (clave.length <= 8 || clave.length >= 12) {
        alert('La clave debe tener minimo 8 caracteres y máximo 12');
        return false;
    }
    if (!clave.includes('/[0-9]/g')) {
        alert('Debes incluir al menos un número');
        return false;
    }
    if (!clave.includes('/[A-Z]/g')) {
        alert('Debes incluir al menos una mayúscula');
        return false;
    }

    retur; true;

}

function cargarUsuarios() {
    if (typeof (Storage !== "undefined")) {
        var registro = JSON.parse(localStorage.getItem("users"));
        if (registro != null) {
            for (let i = 0; i < registro.length; i++) {
                users[0] = registro[i];
            }
        }

    }
}