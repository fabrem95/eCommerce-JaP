// Elementos HTML
const profileForm = document.getElementById('profileForm')
const profileInfoParser = JSON.parse(localStorage.getItem('profileInfo'))
const profileImgInput = document.getElementById('profileImgInput')
const profileImg = document.getElementById('profileImg')

const refreshProfileInfo = () => {
    
    document.getElementById('profileName').value = profileInfoParser.profileName
    document.getElementById('profileLastname').value = profileInfoParser.profileLastname
    document.getElementById('profileEmail').value = profileInfoParser.profileEmail
    document.getElementById('profileTel').value = profileInfoParser.profileTel
} 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let localProfileImg = localStorage.getItem("profileImg");
    
    if (localProfileImg !== null) {
        profileImg.src = localProfileImg
    }

    profileImgInput.onchange = (e) => {
        let avatar = e.target.files[0]
        var fr = new FileReader();

        fr.readAsDataURL(avatar);
        fr.onload = function () {
            profileImg.src = fr.result;
        }
    }

    profileImg.addEventListener("load", function () {

        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
    
        // Make sure canvas is as big as the picture
        imgCanvas.width = profileImg.width;
        imgCanvas.height = profileImg.height;
    
        // Draw image into canvas element
        imgContext.drawImage(profileImg, 0, 0, profileImg.width, profileImg.height);
    
        // Get canvas contents as a data URL
        var imgAsDataURL = imgCanvas.toDataURL("image/png");
    
        // Save image into localStorage
        try {
            localStorage.setItem("profileImg", imgAsDataURL);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false); 

    profileForm.onsubmit = (e) => {
        e.preventDefault()
        var profileName = document.getElementById('profileName').value
        var profileLastname = document.getElementById('profileLastname').value
        var profileEmail = document.getElementById('profileEmail').value
        var profileTel = document.getElementById('profileTel').value

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