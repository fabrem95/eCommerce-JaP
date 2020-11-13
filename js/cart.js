//Elementos HTML
var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart-row')
var cartProds = document.getElementById("cartProds")
var deleteCartItemButtons = document.getElementsByClassName('delete-item')
var cartSubtotal = document.getElementsByClassName('cart-subtotal-price')[0]
var shippingMethodPrice = document.getElementById('shippingMethodPrice')
var cartTotalPrice = document.getElementsByClassName('cart-total-price')[0]
var cartForm = document.getElementById('cartForm')

// Variables
var total = 0
var shippingCost = 5
var currentCartArray = []

//Functions
function showCartArray(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let cart = currentCartArray[i];

            htmlContentToAppend += `
                <div class="card-body border bg-light">
                    <div class="row cart-row">
                        <div class="col-md-5 col-lg-3 col-xl-3 h-50">
                            <img src="`+ cart.src +`" alt="" class="cart-image rounded img-fluid w-100">
                        </div>
                        <div class="col-md-7 col-lg-9 col-xl-9">
                            <div class="row">
                                <div class="col-7 px-0">
                                    <h6 class="">`+ cart.name +`</h6>
                                </div>
                                <div class="col-2 px-0">
                                    <div class="pl-4">
                                        <input class="form-control quantity" min="0" name="quantity" value="`+ cart.count +`" type="number">
                                    </div>
                                </div>
                                <div class="col-3 pl-0 text-right align-text-bottom">
                                    <p class="mb-0 "><span><strong class="item-currency">`+ cart.currency +" "+`</strong><strong class="cart-price">`+ cart.unitCost +`</strong></span></p>
                                </div>
                            </div>
                            <button class="delete-item btn btn-outline-danger float-right mt-5">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path class="bi-trash" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path class="bi-trash" fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                `
        }

        cartProds.innerHTML = htmlContentToAppend;
}

function updateCartTotal() {
    total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity')[0]
        var itemCurrency = cartRow.getElementsByClassName('item-currency')[0].innerText
        var price = parseInt(priceElement.innerText)
        var quantity = quantityElement.value

        if (itemCurrency === "UYU ") {
            total += (price * quantity)
        } else {
            total += (price * quantity)*40
        }
    }

    if (cartItemContainer.childElementCount===0) {

        cartSubtotal.innerText = 'UYU ' + 0
        
        shippingMethodPrice.innerHTML = 'UYU ' + 0
        
        cartTotalPrice.innerText = 'UYU ' + 0

    } else {
        
        cartSubtotal.innerText = 'UYU ' + parseInt(total) 
        
        shippingMethodPrice.innerHTML = 'UYU ' + parseInt(total*(shippingCost/100))
        
        cartTotalPrice.innerText = 'UYU ' + parseInt(total*(1+shippingCost/100))  
    }

}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// Validacion de la Forma de Pago
document.getElementById('payButton').onclick = () => {
    if (
        document.getElementById('cname').value.length == 0 ||
        document.getElementById('ccnum').value.length == 0 ||
        document.getElementById('expYear').value.length == 0 ||
        document.getElementById('cvv').value.length == 0
    ) {
        alert('Complete todos los campos de Forma de Pago')
    }
}

var getFormData = function (form) {
	var obj = {};
    var formData = new FormData(form);
    
	for (var key of formData.keys()) {
		obj[key] = formData.get(key);
	}
	return obj;
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_PRODS).then(function(resultObj){
        if (resultObj.status === "ok"){
            let obj = resultObj.data.articles
            currentCartArray = obj

            showCartArray();
            updateCartTotal();

            //Listener para los cambios en la cantidad de producto
            var quantityInputs = document.getElementsByClassName('quantity')
            for (var i = 0; i < quantityInputs.length; i++) {
                var input = quantityInputs[i]
                input.addEventListener('change', quantityChanged)
            }

            //Listener para el metodo de envio
            var shippingMethodSelectors = document.getElementsByName('shipping')
            for (var i = 0; i < shippingMethodSelectors.length; i++) {
                var shippingInput = shippingMethodSelectors[i]
                shippingInput.addEventListener('click', () => {
                    shippingCost = event.target.value
                    
                    shippingMethodPrice.innerHTML = 'UYU ' + total*(shippingCost/100)

                    updateCartTotal()
                })
            }

            //Remueve item del carro
            for (let i = 0; i < deleteCartItemButtons.length; i++) {
                var deleteCartItem = deleteCartItemButtons[i];
                
                deleteCartItem.onclick = () => {
                    var deleteButton = event.target

                    deleteButton.closest('.card-body').remove();

                    updateCartTotal()
                }
            }
        }
    });

    cartForm.onsubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getFormData(cartForm))
        })
    }
});