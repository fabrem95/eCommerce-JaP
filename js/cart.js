let currentCartArray = []
let cartUnitCount = document.getElementsByClassName('quantity')

function showCartArray(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let cart = currentCartArray[i];

            htmlContentToAppend += `
                <div class="row mb-4">
                    <div class="col-md-5 col-lg-3 col-xl-3">
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0"> 
                        <img src="`+ cart.src +`" alt="" class="img-fluid w-50 mx-5">
                    </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9 pl-0">
                    <div>
                        <div class="d-flex justify-content-between">
                        <div class="col-6">
                            <h6>`+ cart.name +`</h6>
                        </div>
                        <div>
                            <div class="text-right">
                            <input class="col-7 quantity" min="0" name="quantity" value="`+ cart.count +`" type="number">
                            </div>
                        </div>
                        <div class="col-3 pr-0 text-right">
                        <p>
                            <span>
                            <strong>`+ cart.currency +" "+`</strong><strong id="cartUnitCost">`+ cart.unitCost +`</strong>
                            </span>
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cartProds").innerHTML = htmlContentToAppend;
}

function showCartSubTotal(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCartArray.length; i++){
        let cart = currentCartArray[i];

            htmlContentToAppend += `
                <div class="card mb-4">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Subtotal
                            <span class="cartSubtotal">`+ cart.currency + " " + cart.unitCost*cart.count +`</span></li>
                            <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                                Envio
                                <span>Gratis</span></li>
                            <li class="list-group-item d-flex justify-content-between align-items-center px-0 mb-3"><strong>Total</strong><span><strong class="cartSubtotal">`+ cart.currency + " " + cart.unitCost*cart.count +`</strong></span></li>
                        </ul>
                        <button type="button" class="btn btn-primary btn-block waves-effect waves-light">Comprar</button>
                    </div>
                </div>
            `
        }

        document.getElementById("cartSubTotal").innerHTML = htmlContentToAppend;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let obj = resultObj.data.articles
            currentCartArray = obj

            showCartArray()
            showCartSubTotal()

            cartUnitCount[0].onchange = () => {
                let cartSubtotal = document.getElementsByClassName('cartSubtotal')
                let cartUnitCost = document.getElementById('cartUnitCost')

                for (let i = 0; i < cartSubtotal.length; i++) {
                    const itemCount = cartSubtotal[i];
                    let unitCost = cartUnitCost.innerHTML
                    
                    itemCount.innerHTML = "UYU " + cartUnitCount[0].value*unitCost
                }
            };
        }
    });
});
