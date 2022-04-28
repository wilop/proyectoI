var users = new Array();
var submit = document.getElementById("submitR");
var form = document.getElementById("register");

submit.addEventListener("click", function (e) {
    e.preventDefault();
    if (validate()) {
        form.submit();
        form.reset();
    }
});


function validate() {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var repassword = document.getElementById("repassword").value;


    if (firstname.length <= 2 || firstname.length >= 20) {
        alert('Firstname too short or to long!');
        return false;
    }
    if (lastname.length <= 2 || lastname.length >= 20) {
        alert('Lastname too short or too long!');
        return false;
    }
    if (phone.length != 8 || isNaN(phone)) {
        alert('Invalid phone');
        return false;
    }
    if (username.length <= 2 || username.length >= 12) {
        alert('Username too short or too long!');
        return false;
    }
    if (password.length < 8 || password.length > 12) {
        alert('Password too short or too long!');
        return false;
    }
    if (password !== repassword) {
        alert('Password does not match!');
        return false;
    }

    var user = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        username: username, password: password
    };

    guardarUsuario(user);
    console.log(user);

    return true;
}
function guardarUsuario(user) {
    if (typeof (Storage !== "undefined")) {
        var valor = user;
        var resgistro = JSON.parse(localStorage.getItem("users"));
        var arreglo = new Array();
        if (resgistro == null) {
            arreglo[0] = valor;
        } else {
            arreglo = resgistro;
            arreglo[arreglo.length] = valor;
        }
        localStorage.setItem("users", JSON.stringify(arreglo));
        users.push(user);
    }
}