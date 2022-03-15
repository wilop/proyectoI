function findRides() {
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    from = from.toLowerCase();
    to = to.toLowerCase();

    var myTab = document.getElementById('tabla-rides');
    var myTr = document.getElementsByTagName('tr');

    for (i = 1; i < myTr.length; i++) {
        var myTd = myTr[i].getElementsByTagName('td');
        from2 = myTd[1].innerText.toLowerCase();
        to2 = myTd[2].innerText.toLowerCase();

        if (from2 == from && to2 == to) {
            myTr[i].style.display = 'table-row';
        } else if (to == '%' && from2 == from) {
            myTr[i].style.display = 'table-row';

        } else if (from == '%' && to2 == to) {
            myTr[i].style.display = 'table-row';

        } else if (from == '%' && to == '%') {
            myTr[i].style.display = 'table-row';

        } else {
            myTr[i].style.display = 'none';
        }
    }
}

var closebtn;
var ele, tr;

function viewRide() {
    ele = document.activeElement;
    tr = ele.parentElement.parentElement;
    var modal = document.getElementById('modal');
    var modalContent = document.getElementById('modalContent');
    var modalButton = document.getElementById('modalButton');
    var frame = document.getElementById('frame');
    closebtn = document.createElement('button');
    closebtn.classList.add('button-light');
    closebtn.innerText = 'Close';
    closebtn.onclick = function (e) {
        modal.style.display = 'none';
        modalContent.innerHTML = "";
        modalButton.innerHTML = "";
    };
    var node = frame.contentWindow.document.getElementById('rides-form');
    modalButton.appendChild(closebtn);
    modalContent.appendChild(document.importNode(node, true));
    var inputs = modalContent.getElementsByTagName('input');
    var textarea = modalContent.getElementsByTagName('textarea')[0];
    textarea.disabled = true;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        if (inputs[i].type == 'reset' || inputs[i].type == 'submit') {
            inputs[i].style.display = 'none';
        }
    }
    readData();
    modal.style.display = 'grid';

}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalContent.innerHTML = "";
        modalButton.innerHTML = "";
    }
}

function readData() {
    if (tr != null) {
        var myTab = document.getElementById('tabla-rides');
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
                // document.getElementById('description').value = myTd[4].innerText;
                // document.getElementById('departure').value = myTd[5].innerText;
                // document.getElementById('arrival').value = myTd[6].innerText;
                // document.getElementById('monday').checked = myTd[7].innerText == 'true' ? true : false;
                // document.getElementById('tuesday').checked = myTd[8].innerText == 'true' ? true : false;
                // document.getElementById('wednesday').checked = myTd[9].innerText == 'true' ? true : false;
                // document.getElementById('thursday').checked = myTd[10].innerText == 'true' ? true : false;
                // document.getElementById('friday').checked = myTd[11].innerText == 'true' ? true : false;
                // document.getElementById('saturday').checked = myTd[12].innerText == 'true' ? true : false;
                // document.getElementById('sunday').checked = myTd[13].innerText == 'true' ? true : false;
            }
        }
    }
}