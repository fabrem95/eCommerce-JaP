let currentCartArray = []

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
                            <div>
                                <div class="row d-flex justify-content-between">
                                    <div class="col-7 px-0">
                                        <h6>`+ cart.name +`</h6>
                                    </div>
                                    <div class="col-2 px-0">
                                        <div class="def-number-input number-input pl-4">
                                            <input class="form-control quantity" min="0" name="quantity" value="`+ cart.count +`" type="number">
                                        </div>
                                    </div>
                                    <div class="col-3 pl-0 text-right align-text-bottom">
                                        <p class="mb-0 "><span><strong class="item-currency">`+ cart.currency +" "+`</strong><strong class="cart-price">`+ cart.unitCost +`</strong></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
        }

        document.getElementById("cartProds").innerHTML = htmlContentToAppend;
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
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
    document.getElementsByClassName('cart-total-price')[0].innerText = 'UYU ' + total
    document.getElementsByClassName('cart-subtotal-price')[0].innerText = 'UYU ' + total
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
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
        }
    });
});