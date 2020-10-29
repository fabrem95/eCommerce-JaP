const profileForm = document.getElementById('profileForm')
let profileInfo = {}

const refreshProfileInfo = () => {
    const profileInfoParser = JSON.parse(localStorage.getItem('profileInfo'))
    
    document.getElementById('profileName').value = profileInfoParser.profileName
    document.getElementById('profileLastname').value = profileInfoParser.profileLastname
    document.getElementById('profileEmail').value = profileInfoParser.profileEmail
    document.getElementById('profileTel').value = profileInfoParser.profileTel
} 


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

    refreshProfileInfo()
});