var cartItemContainer = document.getElementsByClassName('cart-items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart-row')
var total = 0
var shippingCost = 5
var currentCartArray = []

function showCartArray(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let cart = currentCartArray[i];

            htmlContentToAppend += `
                <div class="card-body border-bottom bg-light">
                    <div class="row cart-row">
                        <div class="col-md-5 col-lg-3 col-xl-3 h-50">
                            <img src="`+ cart.src +`" alt="" class="rounded img-fluid w-100">
                        </div>
                        <div class="col-md-7 col-lg-9 col-xl-9">
                            <div class="row">
                                <div class="col-7 px-0">
                                    <h6>`+ cart.name +`</h6>
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
                            <button class="delete-item btn btn-danger float-right mt-5">
                                <span>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                `
        }

        document.getElementById("cartProds").innerHTML = htmlContentToAppend;
}

function updateCartTotal() {

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity')[0]
        var itemCurrency = cartRow.getElementsByClassName('item-currency')[0].innerText
        var price = parseInt(priceElement.innerText)
        var quantity = quantityElement.value

        if (itemCurrency === "UYU ") {
            total = 0
            total += (price * quantity)
        } else {
            total += (price * quantity)*40
        }
    }

    document.getElementsByClassName('cart-subtotal-price')[0].innerText = 'UYU ' + parseInt(total) 
    
    document.getElementById('shippingMethod').innerHTML = 'UYU ' + parseInt(total*(shippingCost/100))
    
    document.getElementsByClassName('cart-total-price')[0].innerText = 'UYU ' + parseInt(total*(1+shippingCost/100))  
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

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

            var quantityInputs = document.getElementsByClassName('quantity')
            for (var i = 0; i < quantityInputs.length; i++) {
                var input = quantityInputs[i]
                input.addEventListener('change', quantityChanged)
            }

            var shippingMethod = document.getElementsByName('shipping')
            for (var i = 0; i < shippingMethod.length; i++) {
                var shippingInput = shippingMethod[i]
                shippingInput.addEventListener('click', () => {
                    shippingCost = event.target.value
                    
                    document.getElementById('shippingMethod').innerHTML = 'UYU ' + total*(shippingCost/100)

                    updateCartTotal()
                })
            }

            var deleteCartItemButtons = document.getElementsByClassName('delete-item')
            for (let i = 0; i < deleteCartItemButtons.length; i++) {
                var deleteCartItem = deleteCartItemButtons[i];
                
                deleteCartItem.onclick = () => {
                    deleteButton = event.target
                    console.log(deleteButton);
                    deleteButton.parentElement.parentElement.parentElement.remove()
                }
            }
        }
    });
});

