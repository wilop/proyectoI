var ele, tr;
var currentUser;
var userRides = new Array();

window.onload = loadCurrentUser();

// Control de los paneles
function changeTab(tab, tabPane) {
    var links = document.getElementsByClassName("tab");
    var panes = document.getElementsByClassName("tab-panel");
    for (let i = 0; i < panes.length; i++) {
        panes[i].classList.add("is-hidden");
        links[i].classList.remove("is-active");
    }
    // window.alert(tab);
    document.getElementById(tab).classList.add("is-active");
    document.getElementById(tabPane).classList.remove("is-hidden");
}
function loadCurrentUser() {
    if (typeof (Storage !== "undefined")) {
        var registro = JSON.parse(sessionStorage.getItem("currentUser"));
        if (registro != null) {
            currentUser = registro;
            document.getElementById("user").innerText = currentUser["username"];
        }

    }

}

function viewRide() {
    ele = document.activeElement;
    tr = ele.parentElement.parentElement;
    var status = document.getElementById('rides-status');
    var link = document.getElementById('r-status');
    var form = document.getElementById('rides-form');
    var inputs = form.getElementsByTagName('input');
    var textarea = document.getElementById('description');
    textarea.disabled = true;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        if (inputs[i].type == 'reset' || inputs[i].type == 'submit') {
            inputs[i].classList.add("is-hidden");
        }
    }

    if (link == null) {
        link = document.createElement('a');
        link.setAttribute("id", "r-status")
    }
    link.innerText = "/ view";
    status.appendChild(link);
    readData();
    changeTab('rides-tab', 'rides')
}
function addRide() {
    ele = document.createElement('tr');
    tr = ele;
    var status = document.getElementById('rides-status');
    var link = document.getElementById('r-status');
    var myTab = document.getElementById('tabla-usr');
    var myTr = myTab.getElementsByTagName('tr');
    var form = document.getElementById('rides-form');
    var inputs = form.getElementsByTagName('input');
    var textarea = document.getElementById('description');

    ele.innerHTML = "<tr></tr>";
    myTab.appendChild(ele);
    textarea.disabled = false;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
        if (inputs[i].type == 'reset' || inputs[i].type == 'submit') {
            inputs[i].classList.remove("is-hidden");
        }
    }
    if (link == null) {
        link = document.createElement('a');
        link.setAttribute("id", "r-status")
    }
    link.innerText = "/ add";
    status.appendChild(link);
    clearFormRides();
    changeTab('rides-tab', 'rides');

}
function editRide() {
    ele = document.activeElement;
    tr = ele.parentElement.parentElement;
    var status = document.getElementById('rides-status');
    var link = document.getElementById('r-status');
    var form = document.getElementById('rides-form');
    var inputs = form.getElementsByTagName('input');
    var textarea = document.getElementById('description');
    textarea.disabled = false;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
        if (inputs[i].type == 'reset' || inputs[i].type == 'submit') {
            inputs[i].classList.remove("is-hidden");
        }
    }

    if (link == null) {
        link = document.createElement('a');
        link.setAttribute("id", "r-status");
    }
    link.innerText = "/ edit";
    status.appendChild(link);
    readData();
    changeTab('rides-tab', 'rides');

}
function deleteRide() {
    ele = document.activeElement;
    tr = ele.parentElement.parentElement;
    var status = document.getElementById('rides-status');
    var modal = document.getElementById('modal');
    var mBody = document.getElementById('modal-body');
    var link = document.getElementById('r-status');
    var myTab = document.getElementById('tabla-usr');
    var myTr = myTab.getElementsByTagName('tr');



    for (let i = 0; i < myTr.length; i++) {
        if (myTr[i] == tr) {
            var myTd = myTr[i].getElementsByTagName('td');
            modal.classList.add("is-active");
            mBody.innerHTML = "<p>" + "Name: " + myTd[0].innerText + "</p><br><p> Start: " + myTd[1].innerText + "</p><p> End: " + myTd[2].innerText + "</p>";
        }
    }

    if (link == null) {
        link = document.createElement('a');
        link.setAttribute("id", "r-status")
    }
    link.innerText = "/ delete";
    status.appendChild(link);
}
function closeModal() {
    var modal = document.getElementById('modal');
    modal.classList.remove("is-active");
}
function deleteThisRide() {
    var myTab = document.getElementById('tabla-usr');
    var myTr = myTab.getElementsByTagName('tr');
    var modal = document.getElementById('modal');
    modal.classList.remove("is-active");
    for (let i = 0; i < myTr.length; i++) {
        if (myTr[i] == tr) {
            modal.classList.remove("is-active");
            myTr[i].innerHTML = "";
        }
    }
}
function saveRide() {
    var myTab = document.getElementById('tabla-usr');
    var myTr = myTab.getElementsByTagName('tr');

    for (let i = 0; i < myTr.length; i++) {
        if (myTr[i] == tr) {
            myTr[i].innerHTML = "<tr> " +
                "<td>" + document.getElementById('ridename').value + "</td>" +
                "<td>" + document.getElementById('start').value + "</td>" +
                "<td>" + document.getElementById('end').value + "</td>" +
                "<td> " +
                "<a href='#' onclick='viewRide()'>View</a> - " +
                "<a href='#' onclick='editRide()'>Edit</a> - " +
                "<a href='#' onclick='deleteRide(document.activeElement)'>Delete</a>" +
                "</td>" +
                "<td class='is-hidden'>" + document.getElementById('description').value + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('departure').value + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('arrival').value + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('monday').checked + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('tuesday').checked + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('wednesday').checked + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('thursday').checked + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('friday').checked + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('saturday').checked + "</td>" +
                "<td class='is-hidden'>" + document.getElementById('sunday').checked + "</td>" +
                "<td class='is-hidden'>" + currentUser + "</td>" +

                " </tr>";
            saveRidesToLocalStorage(myTr[i]);

        }
    }
    changeTab('dashboard-tab', 'dashboard');

}
function saveRidesToLocalStorage(ride) {
    var myRide = ride.getElementsByTagName('td');
    alert(ride);

    var ride = {
        ridename: myRide[0].innerText,
        star: myRide[1].innerText,
        end: myRide[2].innerText,
        // "<td> " +
        // "<a href='#' onclick='viewRide()'>View</a> - " +
        // "<a href='#' onclick='editRide()'>Edit</a> - " +
        // "<a href='#' onclick='deleteRide(document.activeElement)'>Delete</a>" +
        // "</td>" +
        description: myRide[4].innerText,
        departure: myRide[5].innerText,
        arrival: myRide[6].innerText,
        monday: myRide[7].innerText == 'true' ? true : false,
        tuesday: myRide[8].innerText == 'true' ? true : false,
        wednesday: myRide[9].innerText == 'true' ? true : false,
        thursday: myRide[10].innerText == 'true' ? true : false,
        friday: myRide[11].innerText == 'true' ? true : false,
        saturday: myRide[12].innerText == 'true' ? true : false,
        dsunday: myRide[13].innerText == 'true' ? true : false,
        user: myRide[14].innerText == currentUser["username"],

    };
    if (typeof (Storage !== "undefined")) {
        var valor = myRide;
        var resgistro = JSON.parse(localStorage.getItem("rides"));
        var arreglo = new Array();
        if (resgistro == null) {
            arreglo[0] = valor;
        } else {
            arreglo = resgistro;
            arreglo[arreglo.length] = valor;
        }
        localStorage.setItem("rides", JSON.stringify(arreglo));
        userRides.push(myRide);
    }
}
function readData() {
    clearFormRides();
    if (tr != null) {
        var myTab = document.getElementById('tabla-usr');
        var myTr = myTab.getElementsByTagName('tr');
        // window.alert('tr: ' + tr.innerHTML);
        for (let i = 0; i < myTr.length; i++) {
            if (myTr[i] == tr) {
                var myTd = myTr[i].getElementsByTagName('td');
                // let myTd = myTr[i];
                // window.alert(myTr[i].innerHTML);
                // window.alert(myTd[0].innerText);
                document.getElementById('ridename').value = myTd[0].innerText;
                document.getElementById('start').value = myTd[1].innerText;
                document.getElementById('end').value = myTd[2].innerText;
                // "<td> " +
                // "<a href='#' onclick='viewRide()'>View</a> - " +
                // "<a href='#' onclick='editRide()'>Edit</a> - " +
                // "<a href='#' onclick='deleteRide(document.activeElement)'>Delete</a>" +
                // "</td>" +
                document.getElementById('description').value = myTd[4].innerText;
                document.getElementById('departure').value = myTd[5].innerText;
                document.getElementById('arrival').value = myTd[6].innerText;
                document.getElementById('monday').checked = myTd[7].innerText == 'true' ? true : false;
                document.getElementById('tuesday').checked = myTd[8].innerText == 'true' ? true : false;
                document.getElementById('wednesday').checked = myTd[9].innerText == 'true' ? true : false;
                document.getElementById('thursday').checked = myTd[10].innerText == 'true' ? true : false;
                document.getElementById('friday').checked = myTd[11].innerText == 'true' ? true : false;
                document.getElementById('saturday').checked = myTd[12].innerText == 'true' ? true : false;
                document.getElementById('sunday').checked = myTd[13].innerText == 'true' ? true : false;
                document.getElementById('user').checked = myTd[14].innerText == 'true' ? true : false;


            }
        }
    }
}

function clearFormRides() {
    var form = document.getElementById('rides-form');
    var inputs = form.getElementsByTagName('input');
    var textarea = document.getElementById('description');
    textarea.value = "";
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'reset' || inputs[i].type == 'submit') {

        } else if (inputs[i].type == 'checkbox') {
            inputs[i].checked = false;
        }
        else {
            inputs[i].value = "";

        }
    }
}