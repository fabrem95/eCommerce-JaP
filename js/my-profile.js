const profileForm = document.getElementById('profileForm')
let profileInfo = {}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    profileForm.onsubmit = (e) => {
        e.preventDefault()
        const profileName = document.getElementById('profileName').value
        const profileLastname = document.getElementById('profileLastname').value
        const profileEmail = document.getElementById('profileEmail').value
        const profileTel = document.getElementById('profileTel').value

        profileInfo = {
            profileName,
            profileLastname,
            profileEmail,
            profileTel
        }

        localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
    }
});