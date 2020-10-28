//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    loginForm.onsubmit = function (e){
        e.preventDefault();
        const user = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        loginAuth("http://localhost:8080/auth", {
            user,
            password
        })
    }

    const loginAuth = function (url, data){

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), 
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", document.getElementById("email").value)
            window.location.href = "./index.html";
        })
        .catch(error => alert('Fallo en la autentificación'))
    }
})