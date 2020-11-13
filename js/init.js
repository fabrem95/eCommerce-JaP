const CATEGORIES_URL = "http://localhost:8080/categories";
const PUBLISH_PRODUCT_URL = "http://localhost:8080/publish_products";
const CATEGORY_INFO_URL = "http://localhost:8080/category_info";
const PRODUCTS_URL = "http://localhost:8080/products";
const PRODUCT_INFO_URL = "http://localhost:8080/products_info";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:8080/products_comments";
const CART_INFO_URL = "http://localhost:8080/cart_info";
const CART_BUY_URL = "http://localhost:8080/cart_buy";
const CART_PRODS = "http://localhost:8080/cart_prods";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  const keyUser = localStorage.getItem("user");
  if(!keyUser) {
    window.location.href = "./login.html";
  }

  const userName = document.getElementById("userName");

  userName.innerHTML = keyUser
});

document.getElementById("logout").onclick = () => {
  localStorage.removeItem("user")
}