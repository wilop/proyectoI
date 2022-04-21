// Retorna falso sí la clave no es valida.
// Retorna true sí la clave es valida.
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